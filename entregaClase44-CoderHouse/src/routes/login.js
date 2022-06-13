const { Router } = require("express");
const passport = require("../passport/passport.js");
const { getLogin } = require("../controllers/loginController.js");

const login = new Router();

login.get("/login", getLogin);

login.post(
  "/login-user",
  passport.authenticate("local-signin", {
    successRedirect: "/home",
    failureRedirect: "/singup",
  })
);

module.exports = login;
