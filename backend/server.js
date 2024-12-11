//Backend ServerJS
//For Rest Operations and Server Mantenance
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



//TODO: Insert Article

//Login Control
app.post('/api/login', async (req, res) => {
  console.log('Request body:', req.body);
  const email = req.body.email;
  const password = req.body.password;
  console.log(`Email: ${email}, Password: ${password}`);

  const session = driver.session(); // Crea una sessione all'interno della route

  try {
    const result = await session.executeRead(tx =>
      tx.run('MATCH (u:User) WHERE u.email = $email AND u.password = $password RETURN u', { email, password })
    );

    if (result.records.length > 0) {
      res.json({ success: true });
    } else {
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