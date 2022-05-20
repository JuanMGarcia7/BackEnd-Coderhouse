/* import LocalStrategy from "passport-local";
import passport from "passport";
import usersMongoDB from "../../contenedores/user/usersMongoDB.js";
import bcryptjs from "bcryptjs";
import { createTransport } from "nodemailer"; */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const usersMongoDB = require("../../contenedores/user/usersMongoDB.js");
const bcryptjs = require("bcryptjs");
const { createTransport } = require("nodemailer");
const logger = require("./logs.js");

const user = new usersMongoDB();
const TEST_MAIL = "jmanuelgarciaa.7@gmail.com";
const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "jmanuelgarciaa.7@gmail.com",
    pass: "quscuxxzaqfyszzd",
  },
});

passport.serializeUser((usuarioBuscado, done) => {
  done(null, usuarioBuscado[0].id);
});

passport.deserializeUser(async (id, done) => {
  const usuario = await user.findUser(id);
  done(null, usuario);
});

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "contraseña",
      passReqToCallback: true,
    },

    async (req, email, contraseña, done) => {
      const listaDeUsuarios = await user.listAll();

      let usuarioBuscado = await user.findUserByEmail(email);

      if (usuarioBuscado.length > 0) {
        return done(null, false, logger.error("The Email is already Taken."));
      } else {
        let contraseña = req.body.contraseña;
        let contraseñaHash = await bcryptjs.hash(contraseña, 8);
        const newUser = {};
        newUser.nombre = req.body.nombre;
        newUser.email = req.body.email;
        newUser.contraseña = contraseñaHash;
        newUser.numeroDeTelefono = req.body.numeroDeTelefono;
        newUser.foto = req.body.foto;
        newUser.direccion = req.body.direccion;
        newUser.edad = req.body.edad;
        newUser.id = listaDeUsuarios.length + 1;
        await user.save(newUser);
        const mailOptions = {
          from: "Servidor Node.js",
          to: TEST_MAIL,
          subject: "Nuevo registro",
          html: `<h1 style="color: blue;">Informacion  <span style="color: green;">Nuevo registro</span></h1>
            <div>
             <ul>Datos:
             <li> Nombre:${newUser.nombre}</li>
             <li> Nombre:${newUser.email}</li>
             <li> Nombre:${newUser.numeroDeTelefono}</li>
             <li> Nombre:${newUser.foto}</li>
             <li> Nombre:${newUser.direccion}</li>
             <li> Nombre:${newUser.edad}</li>
             </ul>
             </div>
             `,
        };
        try {
          const info = await transporter.sendMail(mailOptions);
          logger.info("Usuario nuevo registrado y email enviado!");
        } catch (error) {
          logger.error(error);
        }
        return done(null, newUser);
      }
    }
  )
);

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, email, contraseña, done) => {
      const usuarioBuscado = await user.findUserByEmail(email);

      if (usuarioBuscado.length < 1) {
        return done(null, false, logger.error("Usuario no encontrado"));
      } else {
        if (!bcryptjs.compareSync(contraseña, usuarioBuscado[0].contraseña)) {
          return done(null, false, logger.error("Incorrect Password"));
        } else {
          return done(null, usuarioBuscado);
        }
      }
    }
  )
);

module.exports = passport;
