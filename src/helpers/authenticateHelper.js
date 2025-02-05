import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import passport from "passport";
import { status } from "./status.js";

dotenv.config();

export function authenticateHelper(strategy, expiresIn = "24H") {
  console.log(strategy);

  return async (req, res, next) => {
    try {
      console.log(strategy, req.body, "v2");

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

        console.log("act here");
        req.login(user, () => {
          if (user?.id) {
            const token = jwt.sign(
              { id: user.id, username: user.username },
              process.env.JWT_SECRET,
              {
                expiresIn,
              }
            );

            // Responder con el token y otros datos
            return res.status(status.success).send({
              auth: true,
              token,
              // qr: user.qr,
              id_user: user.id,
              name_user: user,
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
