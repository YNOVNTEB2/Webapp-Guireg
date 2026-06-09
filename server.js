const handler = require("serve-handler");
const http = require("http");
const sql = require("mssql");

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: "db-guireg.database.windows.net",
  database: "db-guireg",
  options: { encrypt: true, trustServerCertificate: false },
};

sql
  .connect(dbConfig)
  .then(() => {
    console.log("Connecté à la base de données SQL");
  })
  .catch((err) => {
    console.error("Erreur de connexion SQL :", err);
  });

const server = http.createServer((request, response) => {
  return handler(request, response, { public: "." });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Running at http://localhost:3000");
});
