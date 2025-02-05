import passport from 'passport'; // Asegúrate de importar passport
import { Strategy as localStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import { getUserByEmailQuery } from "../models/auth.js";

passport.use(
  "loginClient",
  new localStrategy(
    {
      usernameField: "email", // Usamos 'email' como campo de usuario
      passwordField: "password", // Campo de la contraseña
      session: false, // No usaremos sesiones
    },
    async (email, password, done) => {
      try {
        // Obtener usuario por correo
        const user = await getUserByEmailQuery(email);

        // Si el usuario no existe, retornamos un error
        if (!user) {
          return done(null, false, {
            message: "Correo o contraseña incorrectos ó usuario no existe",
          });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, {
            message: "Contraseña incorrectos",
          });
        }

        // Si todo es correcto, devolver el usuario
        return done(null, {
          id: user.id,
          email: user.email,
          role: user.role || "client", // Puedes añadir un rol si lo deseas
        });
      } catch (error) {
        return done(error); // Manejo de errores
      }
    }
  )
);
