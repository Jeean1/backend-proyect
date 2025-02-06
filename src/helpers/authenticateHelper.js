import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import passport from "passport";
import { status } from "./status.js";

dotenv.config();

export function authenticateHelper(strategy, expiresIn = "1H") {
  return async (req, res, next) => {
    try {
      passport.authenticate(strategy, (err, user, info) => {
        if (err) {
          console.error(err);
          return res
            .status(status.error)
            .send({ error: true, message: "Error en la autenticación" });
        }

        if (info) {
          return res
            .status(status.bad)
            .send({ error: true, message: info.message });
        }

        req.login(user, () => {
          if (user?.id) {
            const token = jwt.sign(
              { id: user.id, username: user.username },
              process.env.JWT_SECRET,
              {
                expiresIn,
              }
            );

            res.cookie("token", token, {
              httpOnly: true, // 🔒 Evita que el JS del frontend acceda a la cookie
              secure: false, // ⚠ Cambia a `true` en producción con HTTPS
              sameSite: "Lax",
              maxAge: 3600000, // 1 hora
            });

            // Responder con el token y otros datos
            return res.status(status.success).send({
              auth: true,
              token,
              id_user: user.id,
              message: "Usuario autenticado y logueado",
            });
          } else {
            console.log("No se encontró el ID del usuario");
            return res
              .status(status.bad)
              .send({ error: true, message: "ID de usuario no válido" });
          }
        });
      })(req, res, next);
    } catch (err) {
      console.error(err);
      return res
        .status(status.error)
        .send({ error: true, message: "Error inesperado" });
    }
  };
}
