/*
  Crea un oggetto con le mappature tra path della 
  richiesta, metodo http e path del file json
*/
 const mappings = {
   // Default is GET
   "/api/users_DEFAULT": "/mocks/default.json",
   // or explicit method and file
  "/api/users": {
    "method": "GET",
    "file": "/mocks/file1.json"
  },
  "/api/users_post": {
    "method": "POST",
    "file": "/mocks/file2.json"
  },
};

export default mappings