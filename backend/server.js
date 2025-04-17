//Backend ServerJS
//For Rest Operations and Server Mantenance
require('dotenv').config();
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });



const PORT = process.env.PORT || 3001; // Usa la variabile d'ambiente PORT o il valore predefinito 3001


//For DB 
const neo4j = require("neo4j-driver");
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)); 
const session = driver.session()
const axios = require("axios");
const fs = require("fs").promises;

const app = express();

app.use(express.json());

app.use(cors({
  origin: process.env.LOCALFRONTENDSERVER_URL,
  credentials: true, 
}));

app.use(express.urlencoded({ extended: true }));

//JWT
const jwt = require("jsonwebtoken");
//Token
const secretKey = process.env.JWT_SECRET

const ImgurclientId = process.env.IMGUR_CLIENT_ID;//imgur client id
const imgurUrl = 'https://api.imgur.com/3/upload';

//Image Upload
async function uploadToImgur(imagePath) {

  try {
      // Leggi il file come base64
      const image = await fs.readFile(imagePath, { encoding: 'base64' });

      // Invia la richiesta a Imgur
      const response = await axios.post(
          imgurUrl,
          { image },
          {
              headers: {
                  Authorization: `Client-ID ${ImgurclientId}`,
              },
          }
      );

      // Ottieni il link pubblico dell'immagine
      const imageUrl = response.data.data.link;
      console.log('Immagine caricata con successo:', imageUrl);
      return imageUrl;
  } catch (error) {
      console.error('Errore durante il caricamento su Imgur:', error.message);
      throw error;
  }
}

//Hash Function
function hashUserCredentials(userPassword) {
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.error(err);
      callback(err, null);
      return;
    }
    const passwordHash = bcrypt.hashSync(userPassword, salt);

    console.log('Hashed Password : ', passwordHash);
  });
}

//Auth Middleware JWT
function authenticateToken(req, res, next) 
{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token mancante' });
  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token non valido' });
    req.user = user;
    next();
  });
}

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}


//Hash Password
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }






app.post('/api/article', authenticateToken, upload.single('image'), async (req, res) => {
  const filePath = req.file.path; // Percorso del file salvato temporaneamente
  const session = driver.session();
  try {
      const { title, description, publishedDate, contenuto, tags } = req.body;
      console.log('Dati ricevuti:', req.body);
      //console.log(`Titolo: ${title}, Descrizione: ${description}, Data di pubblicazione: ${publishedDate}, Anteprima: ${bodyPreview}, Tags: ${tags || 'Nessun tag'}`);

      
      console.log('File ricevuto e salvato temporaneamente in:', filePath);

      // Invia il file a Imgur
      const imageUrl = await uploadToImgur(filePath);

      const result = await session.executeWrite(async (tx) => {
        // Step 1: Ottieni il massimo ID
        const maxIdResult = await tx.run(
            "MATCH (a:Article) RETURN COALESCE(MAX(a.id), 0) AS maxId"
        );
        const maxId = maxIdResult.records[0].get("maxId");

        // Step 2: Crea il nuovo articolo con l'ID incrementato
        return await tx.run(
            `
            CREATE (a:Article {
                id: $id,
                title: $title,
                description: $description,
                publishedDate: $publishedDate,
                contenuto: $contenuto,
                image: $image,
                tags: $tags,
                creatoDa: $author
            })
            RETURN a
            `,
            {
                id: maxId + 1,
                title: title,
                description: description,
                publishedDate: publishedDate,
                contenuto: contenuto,
                image: imageUrl,
                tags: tags ,
                author: req.user.email
            }
        );
    });

      if (result.records.length === 0) {
        throw new Error('Errore durante la creazione dell\'articolo');
        await fs.unlink(filePath);
      }else{
        console.log('Articolo creato con successo');
      }


      res.status(200).json({ message: 'Articolo creato con successo', imageUrl });
      await fs.unlink(filePath);//elimina il file temporaneo
      console.log('File eliminato');
  } catch (error) {
      console.error('Errore:', error);
      res.status(500).json({ message: 'Errore durante la creazione dell\'articolo' });
      await fs.unlink(filePath);
  }finally {
    session.close();
  }
});

//Login Control
app.post('/api/login', async (req, res) => {
  console.log('Request body:', req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log(`Email: ${email}, Password: ${password}`);


  const session = driver.session(); // Crea una sessione all'interno della route

  try {
    const result = await session.executeRead(tx =>
      tx.run('MATCH (g:Giornalista) WHERE g.email = $email RETURN g', { email })
    );

    console.log('Dopo la query');

    if (result.records.length === 0) {
      console.log('Login failed, email non trovata nel database');
      return res.status(401).json({ success: false, message: 'Email o password non validi' });
    }
    const storedHash = result.records[0].get('g').properties.passwd;
    console.log('storedHash from DB:', storedHash);
    const match = await bcrypt.compare(password, storedHash);
    console.log('bcrypt.compare returned:', match);

    console.log('Dopo Compare');

    if(!match)
    {
      console.log('❌ Password NON corrisponde, return 401');
      return res.status(401).json({ success: false, message: 'Email o password non validi' });
    } 
    console.log('✅ Password corretta, procedo a creare il token');
    console.log('Password corretta --- qui si blocca il codice');
    const token = jwt.sign(
      { email: email },
      secretKey,
      { expiresIn: '1h' }
    );
    console.log('Token creato:', token);
    res.json({
      success: true,
      token,
      expiresIn: 3600,
      giornalista: {
        email: email,
        nome: result.records[0].get('g').properties.nome,
        articoli_creati: result.records[0].get('g').properties.articoli_creati
      }
    });
    console.log('Login successful');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Errore interno del server' });
  } finally {
    // Assicurati di chiudere la sessione al termine
    session.close();
  }
});

// Funzione per creare un giornalista
async function createGiornalista(email, password, nome) {
  const session = driver.session();

  try {
    const passwordHash = hashUserCredentials(password);

    const result = await session.executeWrite(tx =>
      tx.run(
        'CREATE (g:Giornalista {email: $email, passwd: $password, nome: $nome, articoli_creati: 0}) RETURN g',
        { email, password: passwordHash, nome }
      )
    );

    if (result.records.length === 0) {
      throw new Error('Errore durante la creazione del giornalista');
    }

    const giornalista = result.records[0].get('g').properties;
    return giornalista;
  } catch (error) {
    console.error('Errore durante la creazione del giornalista:', error);
    throw error;
  } finally {
    session.close();
  }
}

// Endpoint per creare un giornalista
app.post('/api/create_giornalista', async (req, res) => {
  const { email, password, nome } = req.body;

  if (!email || !password || !nome) {
    return res.status(400).json({ success: false, message: 'Email, password e nome sono obbligatori' });
  }

  const session = driver.session();

  try {
    const hashed = await hashPassword(password);
    const result = await session.executeWrite(tx =>
      tx.run(
        'CREATE (g:Giornalista {email: $email, passwd: $passwd, nome: $nome, articoli_creati: 0}) RETURN g',
        { email, passwd: hashed, nome }
      )
    );
    const record = result.records[0].get('g').properties;

    const token = generateToken({ email, nome });

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict', // Imposta a true in produzione
      maxAge: 3600000 // 1 ora
    });

    res.status(201).json({
      success: true,
      giornalista: {
        email: record.email,
        nome: record.nome,
        articoli_creati: record.articoli_creati
      }
    });
    console.log('Giornalista creato con successo:', record);
    
  } catch (error) {
    console.error('Errore nella creazione del giornalista:', error);
    res.status(500).json({ success: false, message: 'Errore interno del server' });
  }
  finally {
    session.close();
  }  
});

//Get All Articles
app.get("/api/articles", async (req, res) => {
  try {
    console.log("Retrieving all articles from Database...\n");
    const result = await session.executeRead(tx =>
      tx.run('MATCH (a:Article) RETURN a')
    );
    const articles = result.records.map(record => record.get('a').properties);
    console.dir(articles, { depth: null, colors: true });
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving articles.');
  }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});