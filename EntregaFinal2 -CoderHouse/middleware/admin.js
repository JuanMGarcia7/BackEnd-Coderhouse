const admin = true;

function autorizado(req, res, next) {
  if (admin) return next();
  res.status(401).send({
    error: -1,
    descripción: `No posee la autorizacion correspondiente`,
  });
}

export default autorizado;
