//Backend ServerJS
//For Rest Operations and Server Mantenance
require('dotenv').config();
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: 'uploads/' });
const cookieParser = require('cookie-parser');



const PORT = process.env.PORT || 3001; // Usa la variabile d'ambiente PORT o il valore predefinito 3001


//For DB 
const neo4j = require("neo4j-driver");
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)); 
const session = driver.session()
const axios = require("axios");
const fs = require("fs").promises;

const app = express();

app.use(express.json());
app.use(cookieParser());

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
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const tokenFromHeader = authHeader?.split(' ')[1];
  const tokenfromcookie = req.cookies.token;

  const finaltoken = tokenFromHeader || tokenfromcookie;

  console.log('Token ricevuto:', finaltoken); // Log per verificare il token ricevuto

  if (!finaltoken) {
    console.error('Token mancante');
    return res.status(401).json({ message: 'Token mancante' });
  }

  jwt.verify(finaltoken, secretKey, (err, user) => {
    if (err) {
      console.error('Errore nella verifica del token:', err.message); // Log per errori di verifica
      return res.status(403).json({ message: 'Token non valido' });
    }
    req.user = user;
    next();
  });
}

//Token Check
app.get('/api/check_token', authenticateToken, (req, res) => {
  return res.json({
    isLoggedIn: true,
    user: {
      nome: req.user.nome, // assicurati che `req.user` abbia questo campo
      email: req.user.email, // opzionale
      // altri dati che vuoi passare
    },
  });
});

function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}


//Hash Password
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

// Endpoint per creare un articolo
app.post('/api/article', authenticateToken, upload.single('image'), async (req, res) => {
  const filePath = req.file?.path; // Percorso del file salvato temporaneamente
  const session = driver.session();
  try {
    const { title, description, publishedDate, contenuto, tags } = req.body;
    const authorName = req.user.nome; // Recupera il nome dell'autore dal token JWT

    console.log('Dati ricevuti:', req.body);
    console.log('Nome autore:', authorName); // Log per verificare il nome dell'autore

    let imageUrl = null;
    if (filePath) {
      // Invia il file a Imgur
      imageUrl = await uploadToImgur(filePath);
    }

    const result = await session.executeWrite(async (tx) => {
      // Step 1: Ottieni il massimo ID
      const maxIdResult = await tx.run(
        "MATCH (a:Article) RETURN COALESCE(MAX(a.id), 0) AS maxId"
      );
      const maxId = maxIdResult.records[0].get("maxId");

      // Step 2: Crea il nuovo articolo con l'ID incrementato e il nome dell'autore
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
          author: $authorName
        })
        RETURN a
        `,
        {
          id: maxId + 1,
          title,
          description,
          publishedDate,
          contenuto,
          image: imageUrl,
          tags: tags.split(','),
          authorName,
        }
      );
    });

    if (result.records.length === 0) {
      throw new Error("Errore durante la creazione dell'articolo");
    }

    res.status(200).json({ message: 'Articolo creato con successo', article: result.records[0].get('a').properties });

    if (filePath) {
      await fs.unlink(filePath); // Elimina il file temporaneo
    }
  } catch (error) {
    console.error('Errore durante la creazione dell\'articolo:', error);
    res.status(500).json({ message: 'Errore durante la creazione dell\'articolo' });

    if (filePath) {
      await fs.unlink(filePath); // Elimina il file temporaneo in caso di errore
    }
  } finally {
    session.close();
  }
});

// Endpoint per ottenere un articolo specifico
app.get('/api/article/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await session.executeRead(tx =>
      tx.run(
        `MATCH (a:Article {id: $id}) RETURN a`,
        { id: parseInt(id) }
      )
    );

    if (result.records.length === 0) {
      return res.status(404).json({ message: 'Articolo non trovato' });
    }

    const article = result.records[0].get('a').properties;
    res.json(article);
  } catch (error) {
    console.error('Errore durante il recupero dell\'articolo:', error);
    res.status(500).json({ message: 'Errore durante il recupero dell\'articolo' });
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

    // Generate JWT token after successful password match
    
    const token = generateToken({ email, nome: result.records[0].get('g').properties.nome });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Strict', 
      maxAge: 3600000 // 1 ora
    })
    .json({
      success: true,
      token,
      expiresIn: 3600,
      giornalista: {
        nome : result.records[0].get('g').properties.nome,
        email: email,
        nome: result.records[0].get('g').properties.nome,
        articoli_creati: result.records[0].get('g').properties.articoli_creati
      }
    });

    console.log('Token creato:', token);
    console.log('Nome Giornalista:', result.records[0].get('g').properties.nome);
    console.log('Login successful');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Errore interno del server' });
  } finally {
    // Assicurati di chiudere la sessione al termine
    session.close();
  }
});

app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: false,
    sameSite: 'Strict', // Imposta a true in produzione
  });
  res.status(200).json({ success: true, message: 'Logout effettuato con successo' });
}
);

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
      secure: false,
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
    console.log('Nome Giornalista:', record.nome);
    console.log('Giornalista creato con successo:', record);
    
  } catch (error) {
    console.error('Errore nella creazione del giornalista:', error);
    res.status(500).json({ success: false, message: 'Errore interno del server' });
  }
  finally {
    session.close();
  }  
});

app.get('/api/create_user', async (req, res) => {
  const { email, password, nome } = req.body;

  const session = driver.session();

  try {
    const hashed = await hashPassword(password);
    const result = await session.executeWrite(tx =>
      tx.run(
        'CREATE (u:User {email: $email, passwd: $passwd, nome: $nome}) RETURN u',
        { email, passwd: hashed, nome }
      )
    );
    const record = result.records[0].get('u').properties;

    res.status(201).json({
      success: true,
      giornalista: {
        email: record.email,
        nome: record.nome
      }
    });
    console.log('Utente creato con successo:', record);
    
  } catch (error) {
    console.error('Errore nella creazione dell\'utente', error);
    res.status(500).json({ success: false, message: 'Errore interno del server, riga 345' });
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
    //console.dir(articles, { depth: null, colors: true });
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while retrieving articles.');
  }
});

// Endpoint per recuperare gli articoli creati dal giornalista
app.get('/api/my_articles', authenticateToken, async (req, res) => {
  const session = driver.session(); // Crea una nuova sessione per questa richiesta
  try {
    const result = await session.executeRead(tx =>
      tx.run(
        `
        MATCH (g:Giornalista {email: $email})-[:CREATO]->(a:Article)
        RETURN a
        `,
        { email: req.user.email }
      )
    );

    const articles = result.records.map(record => record.get('a').properties);
    res.json(articles);
  } catch (error) {
    console.error('Errore nel recupero degli articoli:', error);
    res.status(500).json({ message: 'Errore nel recupero degli articoli' });
  } finally {
    session.close(); // Chiudi la sessione al termine
  }
});

// Endpoint migliorato per aggiornare un articolo
app.put('/api/articles/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, contenuto, tags, publishedDate } = req.body;
  const lastEditDate = new Date().toISOString(); // Data dell'ultima modifica

  console.log('ID ricevuto:', id); // Log per verificare l'ID
  console.log('Utente autenticato:', req.user.nome); // Log per verificare l'utente autenticato

  try {
    // Verifica che l'articolo esista e appartenga all'utente autenticato
    const checkResult = await session.executeRead(tx =>
      tx.run(
        `MATCH (a:Article {id: $id}) WHERE a.author = $author RETURN a`,
        { id: parseInt(id), author: req.user.nome }
      )
    );

    console.log('Risultato query:', checkResult.records); // Log per verificare il risultato della query

    if (checkResult.records.length === 0) {
      return res.status(403).json({ message: 'Non sei autorizzato a modificare questo articolo o non esiste.' });
    }

    // Aggiorna l'articolo
    const result = await session.executeWrite(tx =>
      tx.run(
        `
        MATCH (a:Article {id: $id})
        SET a.title = COALESCE($title, a.title),
            a.description = COALESCE($description, a.description),
            a.contenuto = COALESCE($contenuto, a.contenuto),
            a.tags = COALESCE($tags, a.tags),
            a.publishedDate = COALESCE($publishedDate, a.publishedDate),
            a.lastEditDate = $lastEditDate
        RETURN a
        `,
        { id: parseInt(id), title, description, contenuto, tags, publishedDate, lastEditDate }
      )
    );

    if (result.records.length === 0) {
      return res.status(404).json({ message: 'Articolo non aggiornato' });
    }

    res.json({ message: 'Articolo aggiornato con successo', lastEditDate });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dell\'articolo:', error);
    res.status(500).json({ message: 'Errore durante l\'aggiornamento dell\'articolo' });
  }
});

// Endpoint per modificare un articolo
app.put('/api/articles/modifyarticle/:id', authenticateToken, async (req, res) => {
  const { id, title, description, contenuto, tags, publishedDate } = req.body;
  const lastEditDate = new Date().toISOString(); // Data dell'ultima modifica

  const formatted = new Date(lastEditDate).toLocaleString('it-IT', 
    {
      day:    '2-digit',
    month:  '2-digit',
    year:   'numeric',
    hour:     '2-digit',
    minute:   '2-digit'
    });

  console.log('ID ricevuto:', id); // Log per verificare l'ID
  console.log('Utente autenticato:', req.user.nome); // Log per verificare l'utente autenticato
  console.log('data ultima modifica:', formatted); // Log per verificare la data dell'ultima modifica

  try {
    // Verifica che l'articolo esista e appartenga all'utente autenticato
    const checkResult = await session.executeRead(tx =>
      tx.run(
        `MATCH (a:Article {id: $id}) WHERE a.author = $author RETURN a`,
        { id: parseInt(id), author: req.user.nome }
      )
    );

    console.log('Risultato query:', checkResult.records); // Log per verificare il risultato della query

    if (checkResult.records.length === 0) {
      return res.status(403).json({ message: 'Non sei autorizzato a modificare questo articolo o non esiste.' });
    }

    // Aggiorna l'articolo
    const result = await session.executeWrite(tx =>
      tx.run(
        `
        MATCH (a:Article {id: $id})
        SET a.title = COALESCE($title, a.title),
            a.description = COALESCE($description, a.description),
            a.contenuto = COALESCE($contenuto, a.contenuto),
            a.tags = COALESCE($tags, a.tags),
            a.publishedDate = COALESCE($publishedDate, a.publishedDate),
            a.lastEditDate = $formatted
        RETURN a
        `,
        { id: parseInt(id), title, description, contenuto, tags, publishedDate, formatted }
      )
    );

    if (result.records.length === 0) {
      return res.status(404).json({ message: 'Articolo non trovato' });
    }

    res.json({ message: 'Articolo aggiornato con successo', lastEditDate });
  } catch (error) {
    console.error('Errore durante l\'aggiornamento dell\'articolo:', error);
    res.status(500).json({ message: 'Errore durante l\'aggiornamento dell\'articolo' });
  }
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});