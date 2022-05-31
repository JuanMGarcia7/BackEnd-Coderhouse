const { Router } = require("express");
const path = require("path");
const passport = require("passport");
const singup = new Router();

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
