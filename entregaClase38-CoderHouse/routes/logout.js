const { Router } = require("express");
const path = require("path");

const logout = new Router();

logout.get("/logout", (req, res) => {
  const nombre = " req.session?.nombre";
  if (nombre) {
    res.render(path.join(process.cwd(), "/public/views/pages/logout.ejs"), {
      nombre,
    });
  } else {
    res.redirect("/");
  }
});

module.exports = logout;
