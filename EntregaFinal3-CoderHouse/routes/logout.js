import { Router } from "express";
import path from "path";

const logout = new Router();

logout.get("/logout", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    res.render(path.join(process.cwd(), "/public/views/pages/logout.ejs"), {
      nombre,
    });
  } else {
    res.redirect("/");
  }
});

export default logout;
