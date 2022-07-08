const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
const users = require("../models/schemaUser.js");
const userDAO = require("../dao/userDAO.js");
const logger = require("../logs/logs.js");
const { transporter } = require("../utils/mensajesConfig.js");

const usuario = new userDAO();
const TEST_MAIL = process.env.TEST_MAIL;
passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "contraseña",
      passReqToCallback: true,
    },

    async (req, email, contraseña, done) => {
      const listaDeUsuarios = await usuario.listAll();

      let usuarioBuscado = await usuario.findUserByEmail(email);

      if (usuarioBuscado.length > 0) {
        return done(null, false, logger.error("The Email is already Taken."));
      } else {
        let contraseñaToHash = req.body.contraseña;
        let contraseñaHash = await bcryptjs.hash(contraseñaToHash, 8);
        const newUser = {};
        newUser.nombre = req.body.nombre;
        newUser.email = req.body.email;
        newUser.contraseña = contraseñaHash;
        newUser.phone = req.body.full_phone;
        newUser.foto = req.body.foto;
        newUser.direccion = req.body.direccion;
        newUser.edad = req.body.edad;
        newUser.id = listaDeUsuarios.length + 1;
        await usuario.save(newUser);
        const mailOptions = {
          from: "Servidor Node.js",
          to: TEST_MAIL,
          subject: "Nuevo registro",
          html: `<h1 style="color: blue;">Informacion nuevo registro</span></h1>
            <div>
             <ul>Datos:
             <li> Nombre:${newUser.nombre}</li>
             <li> Email:${newUser.email}</li>
             <li> Numero de telefono:${newUser.phone}</li>
             <li> Foto:${newUser.foto}</li>
             <li> Direccion:${newUser.direccion}</li>
             <li> Edad:${newUser.edad}</li>
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
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "contraseña",
      passReqToCallback: true,
    },
    async (req, email, contraseña, done) => {
      const user = await usuario.findUserByEmail(email);

      if (user.length < 1) {
        return done(null, false, logger.error("Usuario no encontrado"));
      } else {
        if (!bcryptjs.compareSync(contraseña, user[0].contraseña)) {
          return done(null, false, logger.error("Incorrect Password"));
        } else {
          logger.info("contraseña correcta");
          return done(null, user);
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user[0].email);
});

passport.deserializeUser((email, done) => {
  const usuario = users.findOne({ email: email });
  done(null, usuario);
});

module.exports = passport;
