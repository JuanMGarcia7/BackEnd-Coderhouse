const { Router } = require("express");
const path = require("path");
const ContenedorMongoDB = require("../contenedores/user/usersMongoDB.js");
const bcryptjs = require("bcryptjs");
const passport = require("passport");

const singup = new Router();
const TEST_MAIL = "jmanuelgarciaa.7@gmail.com";
const register = new ContenedorMongoDB();

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
