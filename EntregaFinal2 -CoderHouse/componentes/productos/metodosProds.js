import { Router } from "express";
import { productsDao } from "../../daos/index.js";
const productos = new Router();

export default (app) => {
  app.use("/api/productos", productos);

  productos.get("/", async (req, res) => {
    res.json(await productsDao.listarAll());
  });

  productos.get("/:id", async (req, res) => {
    res.json(await productsDao.listarID(req.params.id));
  });

  productos.post("/", async (req, res) => {
    res.json(await productsDao.save(req.body));
  });

  productos.put("/:id", async (req, res) => {
    res.json(await productsDao.update(req.params.id, req.body));
  });

  productos.delete("/", async (req, res) => {
    res.json(await productsDao.deleteAll());
  });

  productos.delete("/:id", async (req, res) => {
    res.json(await productsDao.deleteById(req.params.id));
  });
};
