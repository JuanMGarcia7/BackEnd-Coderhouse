/* import { Router } from "express";
import ContenedorMongoDB from "../contenedores/usersMongoDB.js";
import bcryptjs from "bcryptjs";

import path from "path";
const login = new Router();

const users = new ContenedorMongoDB();

login.get("/login", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/views/login.html"));
});

login.post("/login", async (req, res) => {
  const listaUsuarios = await users.listAll();

  let usuarioToLog = req.body.email;
  let contraseñaToLog = req.body.contraseña;

  const usuarioBuscado = listaUsuarios.find((e) => e.email == usuarioToLog);

  if (
    usuarioBuscado &&
    bcryptjs.compareSync(contraseñaToLog, usuarioBuscado.contraseña)
  ) {
    res.redirect("/home");
  } else {
    console.log("error aca else");
    res.redirect("/singup");
  }
});

export default login;
 */

import { Router } from "express";
import passport from "../public/js/passport.js";
import webAuth from "../public/auth/index.js";
import path from "path";
const login = new Router();

login.get("/login", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/views/login.html"));
});

login.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/home",
    failureRedirect: "/singup",
  })
);

export default login;
