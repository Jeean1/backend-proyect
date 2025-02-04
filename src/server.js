import "dotenv/config"; // Importa dotenv
import express from "express";
import router from "./routes/auth/index.js"; // Importa el router con ESModules

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/auth", router);

app.listen(PORT, () => {
  console.log(`🚀🚀 Server running at http://localhost:${PORT} 🚀🚀`);
});
