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

const app = express();

app.use(express.json());

app.use(cors());

//Hash Function
function hashString(str) {
  const saltRounds = 10;
  return bcrypt.hashSync(str, saltRounds);
}



//TODO: Insert Article

//Login Control
app.post('/api/login', async (req, res) => {
  console.log('Request body:', req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log(`Email: ${email}, Password: ${password}`);

  
  const passwordHash = hashString(password);
  const emailHash = hashString(email);

  console.log(`Password: ${password}, Hashed Password: ${passwordHash},email: ${email}, Hashed Email: ${emailHash}`);

  const session = driver.session(); // Crea una sessione all'interno della route

  try {
    const result = await session.executeRead(tx =>
      tx.run('MATCH (g:Giornalista) WHERE g.email = $email RETURN g', { email })
    );

    console.log("arrivato?")

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