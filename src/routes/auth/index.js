const express = require("express");
const { loginController } = require("../controllers/auth");
let router = express.Router();

router.post('/ecommerce/login', loginController);
