import metodoCarts from "../componentes/carts/metodoCarts.js";
import metodosProds from "../componentes/productos/metodosProds.js";

export default (app) => {
  metodosProds(app);
  metodoCarts(app);
  app.get("*", (req, res) =>
    res.status(404).json({
      error: -2,
      description: `ruta ${req.originalUrl} método get no implementado`,
    })
  );
};
