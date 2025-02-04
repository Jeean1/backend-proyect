import express from "express";
import { loginController } from "../controllers/auth/index.js"; // Importa con ESModules

const router = express.Router();
router.post("/ecommerce/login", loginController);

export default router; // Exportación con ESModules
