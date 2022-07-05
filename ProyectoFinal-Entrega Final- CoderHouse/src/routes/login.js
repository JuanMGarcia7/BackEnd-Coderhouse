const { Router } = require("express");
const passport = require("../passport/passportConfig.js");
const { getLogin } = require("../controllers/loginController.js");

const login = new Router();

login.get("/login", getLogin);

login.post(
  "/login-user",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/singin",
  })
);

module.exports = login;
