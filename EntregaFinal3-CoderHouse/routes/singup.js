/* import { Router } from "express";
import ContenedorMongoDB from "../contenedores/user/usersMongoDB.js";
import bcryptjs from "bcryptjs";
import { createTransport } from "nodemailer";
import passport from "passport";
import path from "path"; */

const { Router } = require("express");
const path = require("path");
const ContenedorMongoDB = require("../contenedores/user/usersMongoDB.js");
const bcryptjs = require("bcryptjs");
const passport = require("passport");

const singup = new Router();
const TEST_MAIL = "jmanuelgarciaa.7@gmail.com";
const register = new ContenedorMongoDB();

/* const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "jmanuelgarciaa.7@gmail.com",
    pass: "quscuxxzaqfyszzd",
  },
}); */

/* singup.post("/singup", async (req, res) => {
  const listaDeUsuarios = await register.listAll();
  let contraseña = req.body.contraseña;
  let contraseñaHash = await bcryptjs.hash(contraseña, 8);
  const usuario = {
    nombre: req.body.nombre,
    email: req.body.email,
    numeroDeTelefono: req.body.numeroDeTelefono,
    contraseña: contraseñaHash,
    foto: req.body.foto,
    direccion: req.body.direccion,
    edad: req.body.edad,
    id: listaDeUsuarios.length + 1,
  };
  //PONER PARA QUE SEAN OBLIGATORIOS TODOS LOS CAMPOS
  const yaExiste = listaUsuarios.find((e) => e.email == usuario.email);

  const mailOptions = {
    from: "Servidor Node.js",
    to: TEST_MAIL,
    subject: "Nuevo registro",
    html: `<h1 style="color: blue;">Informacion  <span style="color: green;">Nuevo registro</span></h1>
    <div>
     <ul>Datos:
     <li> Nombre:${usuario.nombre}</li>
     <li> Nombre:${usuario.email}</li>
     <li> Nombre:${usuario.numeroDeTelefono}</li>
     <li> Nombre:${usuario.foto}</li>
     <li> Nombre:${usuario.direccion}</li>
     <li> Nombre:${usuario.edad}</li>
     </ul>
     </div>
     `,
  };

  if (yaExiste) {
    return res.sendFile(
      path.join(process.cwd(), "/public/views/userRegisted.html")
    );
  } else {
    register.save(usuario);
    try {
      const info = await transporter.sendMail(mailOptions);
      res.redirect("/home");
    } catch (error) {
      console.log(error);
    }
  }
}); */

singup.post(
  "/singup",
  passport.authenticate("local-signup", {
    successRedirect: "/home",
    failureRedirect: "/login",
  })
);

singup.get("/singup", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/views/register.html"));
});
module.exports = singup;
