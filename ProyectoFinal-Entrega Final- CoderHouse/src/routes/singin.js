const { Router } = require("express");
const path = require("path");
const passport = require("../passport/passportConfig.js");

const singin = new Router();

singin.post(
  "/singup",
  passport.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/login",
  })
);

singin.get("/singin", (req, res) => {
  res.sendFile(path.join(process.cwd(), "/public/views/singin.html"));
});
module.exports = singin;
