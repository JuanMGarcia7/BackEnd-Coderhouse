const { Router } = require("express");
const path = require("path");
const passport = require("../public/js/passport.js");

const login = new Router();

login.get("/login", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/views/login.html"));
});
login.get("/", (req, res) => {
  res.redirect("/login");
});

login.post(
  "/login-user",
  passport.authenticate("local-signin", {
    successRedirect: "/home",
    failureRedirect: "/singup",
  })
);

module.exports = login;
