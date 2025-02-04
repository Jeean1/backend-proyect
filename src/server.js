require("dotenv").config(); // Carga las variables del archivo .env
const express = require("express");
const app = express();
const PORT = process.env.PORT;

// Middleware para analizar JSON
app.use(express.json());

// console.log("testing here");
// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Hola, mundo desde Node.js!");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀🚀 Server at http://localhost:${PORT} 🚀🚀`);
});
