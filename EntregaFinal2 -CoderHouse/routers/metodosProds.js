import { Router } from "express";
import { productosApi } from "../daos/index.js";
import admin from "../middleware/admin.js";
const rutaProd = new Router();

export default (app) => {
  app.use("/api/productos", rutaProd);

  rutaProd.get("/", async (req, res) => {
    res.json(await productosApi.listarAll());
  });

  rutaProd.get("/:id", async (req, res) => {
    let id = req.params.id;
    res.json(await productosApi.listarID(id));
  });

  rutaProd.post("/", admin, async (req, res) => {
    res.json(await productosApi.save(req.body));
  });

  rutaProd.put("/:id", admin, async (req, res) => {
    res.json(await productosApi.update(req.params.id, req.body));
  });

  rutaProd.delete("/", admin, async (req, res) => {
    res.json(await productosApi.deleteAll());
  });

  rutaProd.delete("/:id", admin, async (req, res) => {
    res.json(await productosApi.deleteById(req.params.id));
  });
};
