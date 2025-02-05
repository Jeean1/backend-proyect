import "dotenv/config"; // Importa dotenv
import express from "express";
import router from "./routes/auth/index.js"; // Importa el router con ESModules
import passport from "passport";
import "./config/passport.js"; // Asegúrate de importar la configuración

const app = express();
const PORT = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(express.json());
// app.use(passport.session());

app.use("/auth", router);

app.listen(PORT, () => {
  console.log(`🚀🚀 Server running at http://localhost:${PORT} 🚀🚀`);
});
