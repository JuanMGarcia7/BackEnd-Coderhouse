import metodoCarts from "./metodoCarts.js";
import metodosProds from "./metodosProds.js";

export default (app) => {
  metodosProds(app),
    (err) => {
      throw err;
    };
  metodoCarts(app);
  app.get("*", (req, res) =>
    res.status(404).json({
      error: -2,
      description: `ruta ${req.originalUrl} método get no implementado`,
    })
  );
};
