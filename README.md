# StreetCats

Benvenuti in **StreetCats**, un'applicazione fullstack progettata per creare e gestire il sito per l'avvistamento di gatti randagi. Questo progetto universitario mira all'apprendimento e all'utilizzo di tecnologie allo stato dell'arte per un'applicazione Full-Stack.

## Progresso del progetto

[█████████████] 100%!!


## Tecnologie Utilizzate

### Frontend
- **React**: Libreria JavaScript per la costruzione di interfacce utente.
- **Vite**: Un build tool di nuova generazione che offre un'esperienza di sviluppo veloce e ottimizzata.
- **Tailwind CSS**: Framework di utilità per uno stile rapido e reattivo.
- **Cypress** : A framework for E2E testing of the FrontEnd

### Backend and DB
- **Node.js** : ambiente di runtime JavaScript
- **Express.js** : framework per API REST
- **JavaScript** : linguaggio di programmazione
- **Cloudinary** : servizio di storage immagini
- **Neo4j** : database a grafo
- **Multer** : middleware per upload file
- **Bcrypt** : hashing password
- **JWT** : autenticazione tramite token
- **dotenv** : gestione variabili d’ambiente
- **cookie-parser** : gestione cookie
- **cors** : gestione CORS

## Struttura del Progetto

La struttura del progetto è organizzata come segue allo stato attuale:
```
StreetCats/
├── backend/
├── cypress/
├── public/
│   ├── favicon.ico
│   └── …  
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── App.vue
│   └── main.js
├── .eslintrc.cjs
├── .gitignore
├── README.md
├── cypress.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js

```

## Requisiti

### OS
- Windows 10+ (non testato)
- macOS 10+ (non testato)
- Linux (Developed on ArchLinux kernel 6.15)

### Package Managers
- Node.js v14 o superiore
- npm (Node Package Manager) o yarn

### FrontEnd
- Vite > 3.0

### Testing
- Cypress > 12.0
- Chromium Browser (Tested)
- Firefox Browser (Tested)

### Database
- Neo4j Desktop

## Installazione

1. **Clona il repository:**

   ```bash
   git clone https://github.com/Alexfinitore10/StreetCats.git
   cd StreetCats

2. **Installa le dipendenze per il front-end:**
   ```bash
   npm install
   ```
3. **Installa le dipendenze per il backend**
   
   Copia il file .env.example e rinominalo in .env. Poi, riempi i valori richiesti:
   ```bash
   cd backend/
   cp .env.example .env
   ```
## Esecuzione
1. **Avvia l'applicazione front end:**
   Nella directory ' StreetCats/ ' :
   ```bash
   npm run dev
   ```
   
3. **Avvia l'applicazione back end:**

   ```bash
   cd backend
   node server.js
   ```
4. **Avvia il database**
   - Avvia Neo4j (versione Desktop o remoto)
   
5. **Indirizzo di default**

   L'applicazione sarà accessibile all'indirizzo: [http://localhost:5173](http://localhost:5173)


# Licenza

MIT License

Copyright (c) 2024 Alexfinitore10

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

# Contatti

Per qualsiasi domanda o suggerimento, puoi contattarci all'indirizzo email: [alexciacciarella@gmail.com](alexciacciarella@gmail.com).

Grazie per il tuo interesse in PressPortal! Keep on keeping on!!<img src="https://ih1.redbubble.net/image.1384215121.0533/raf,750x1000,075,t,101010:01c5ca27c6.jpg" alt="PressPortal Logo" width="50" />


