//Backend ServerJS
//For Rest Operations and Server Mantenance
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");

const PORT = 3001;


//For DB 
const neo4j = require("neo4j-driver");
const driver = neo4j.driver('neo4j://localhost:7687', neo4j.auth.basic('neo4j', 'pressportaldb')) 
const session = driver.session()
const {imgbbUpload} = require("imgbb-image-uploader");

const app = express();

app.use(express.json());

app.use(cors());

//JWT
const jwt = require("jsonwebtoken");
//Token
const secretKey = '502f90aeb311ffb55b0e7eed4876bc615ee03c8373f2a6f4a902c2a82dc4b486d312f1dd5eb7ae38d1a66cd759ada5f7601eb443be9d24c8c196d6463435b62bc86e3d8fc9ef3f8fe1bfe4e23f2f08790f6e234baf1771ef814a54428feb95b5a7a10ca31e5d6ef7e0dd96c06aa6a58313f762c57ff69c00245e40ffaef4db942cbd54c7444e7eed3f2ceaa53412583a6276c28778eb908b439a4b21ff5d60fbfbfa9441d63c6a7f00205d5af25e96a679373d63a1deb4271585da640422d4a4fb835b99eea585c33bcd8919924f52d0b401395f3dfba8465eec12d0d5550ef78147c412e652070f33472df744872ce0c948b387a5b891c9202838f9e5d2be76';

//Image Upload
function uploadImageToImgBB(image) {
  return new Promise((resolve, reject) => {
    imgbbUpload({
      key: "325abbfd3365b40562e88dae9c1a97ad", // your imgbb api key
      image: image, // image selected from the file input
    })
      .then((data) => {
        resolve(data.image.url);
      })
      .catch((error) => {
        reject(error);
      });
  });
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


//TODO: Insert Article
//Insert Article
app.post('/api/insert_article', async (req, res) => {
  const session = driver.session()
  //image takeCarer
  uploadImageToImgBB(req.body.image)
    .then((url) => {
      const imageUrl= url;
      console.log(url);
    })
    .catch((error) => {
      console.error(error);
    });
  const result = await session.run(
    "CREATE (a: Article {id: $id, title: $title, description: $description, publishedDate: $publishedDate, bodyPreview: $bodyPreview, image: $image, tags: $tags}) RETURN a",
    {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      publishedDate: req.body.publishedDate,
      bodyPreview: req.body.bodyPreview,
      image: imageUrl,
      tags: req.body.tags || [],
    }
  )
  const singleRecord = result.records[0]
  const node = singleRecord.get(0)
  res.send(node.properties)
})

//Login Control
app.post('/api/login', async (req, res) => {
  console.log('Request body:', req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log(`Email: ${email}, Password: ${password}`);

  
  hashUserCredentials(password);


  const session = driver.session(); // Crea una sessione all'interno della route

  try {
    const result = await session.executeRead(tx =>
      tx.run('MATCH (g:Giornalista) WHERE g.email = $email RETURN g', { email })
    );

    if (result.records.length === 0) {
      console.log('Login failed, email non trovata nel database');
      return res.status(401).json({ success: false, message: 'Email o password non validi' });
    }
    const storedHash = result.records[0].get('g').properties.passwd;
    const match = await bcrypt.compare(password, storedHash);

    if (match) {
      console.log('Login successful');
      res.json({ success: true });
    } else {
      console.log('Login failed, password non corretta');
      res.status(401).json({ success: false, message: 'Email o password non validi' });
    }
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
    const passwordHash = hashString(password);

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

  try {
    const giornalista = await createGiornalista(email, password, nome);
    res.status(201).json({ success: true, giornalista });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Errore interno del server' });
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