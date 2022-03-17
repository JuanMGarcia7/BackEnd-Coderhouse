import { Router } from "express";
import { productsDao } from "../../daos/index.js";
const rutaProd = new Router();

export default (app) => {
  app.use("/api/productos", rutaProd);

  rutaProd.get("/", async (req, res) => {
    res.json(await productsDao.listarAll());
  });

  rutaProd.get("/:id", async (req, res) => {
    res.json(await productsDao.listarID(req.params.id));
  });

  rutaProd.post("/", async (req, res) => {
    res.json(await productsDao.save(req.body));
  });

  rutaProd.put("/:id", async (req, res) => {
    res.json(await productsDao.update(req.params.id, req.body));
  });

  rutaProd.delete("/", async (req, res) => {
    res.json(await productsDao.deleteAll());
  });

  rutaProd.delete("/:id", async (req, res) => {
    res.json(await productsDao.deleteById(req.params.id));
  });
};
