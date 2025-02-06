import "dotenv/config"; // Importa dotenv
import express from "express";
import router from "./routes/auth/index.js"; // Importa el router con ESModules
import passport from "passport";
import "./config/passport.js"; // Asegúrate de importar la configuración
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000", // O "*" para permitir cualquier origen (no recomendado en producción)
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Permite que las cookies se envíen entre dominios
  })
);

// app.use(passport.session());

app.use("/auth", router);

app.listen(PORT, () => {
  console.log(`🚀🚀 Server running at http://localhost:${PORT} 🚀🚀`);
});
