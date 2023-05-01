import http from 'http';  // Importa il modulo http
import fs from 'fs';      // modulo fs per leggere il file json
import path from 'path';
import { fileURLToPath } from 'url';

import mappings from './mappings.mjs';

// Crea un server http
const server = http.createServer((req, res) => {
  // Ottieni il path e il metodo della richiesta usando il destructuring
  const { url: requestPath, method: requestMethod } = req;

  // Cerca l'oggetto corrispondente al path della richiesta nell'oggetto mappings usando l'operatore []
  let mapping = mappings[requestPath];
  
  // Controlla se la corrisponde esiste
  if (mapping) {
    // GET request as default
    if (!mapping.method) {
      let file = mapping
      mapping = {
        method: "GET",
        file
      }
    }
    console.log('Corrispondenza tra path e mock 👉️:', requestPath + ' -> ' + mapping.file);
    // Controlla se il metodo della richiesta corrisponde a quello dell'oggetto
    if (requestMethod === mapping.method) {

      // Ottieni il path del file json dall'oggetto usando il destructuring
      const { file: filePath } = mapping;
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      let url = path.join(__dirname, filePath);

      // Leggi il file json
      fs.readFile(url, (err, data) => {
        // Gestisci gli errori di lettura
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Errore interno del server mock');
        } else {
          // Invia il file json come risposta
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data);
        }
      });
    } else {
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
      };
      // if pre-flight request, handle it here
      if (req.method === 'OPTIONS') {
        console.log('Option request👇️:', req.url);
        res.writeHead(204, headers);
        res.end();
        return;
      }
      // Invia una risposta di errore per i metodi non corrispondenti
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Metodo non consentito');
    }
  } else {
    // Invia una risposta di errore per gli altri indirizzi
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Indirizzo non trovato');
  }
});

// Avvia il server sulla porta 3000
server.listen(3000, () => {
  console.log(`Server mock in ascolto sulla porta 3000`);
});
