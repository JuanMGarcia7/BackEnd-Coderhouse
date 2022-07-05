const logger = require("../logs/logs.js");

//middleware para chequear que se haya iniciado sesion y proteger las rutas correspondientes
function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    logger.error("Debes ingresar sesion!");
    res.redirect("/login");
  }
}
module.exports = checkAuthentication;
