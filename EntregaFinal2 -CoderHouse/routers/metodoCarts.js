import { Router } from "express";
import { cartsApi, productosApi } from "../daos/index.js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const cart = new Router();
export default (app) => {
  app.use("/api/carrito", cart);

  cart.get("/", async (req, res) => {
    res.json(await cartsApi.listarAll());
  });

  cart.get("/:id", async (req, res) => {
    res.json(await cartsApi.listarID(req.params.id));
  });

  cart.post("/", async (req, res) => {
    res.json(await cartsApi.save(req.body));
  });

  cart.delete("/", async (req, res) => {
    res.json(await cartsApi.deleteAll());
  });

  cart.delete("/:id", async (req, res) => {
    res.json(await cartsApi.deleteById(req.params.id));
  });

  cart.post("/:id/productos", async (req, res) => {
    if (process.env.DB === "firebase") {
      let cart = await cartsApi.listarID(req.params.id);
      let product = await productosApi.listarID(req.body.id);

      cart.productos.push(product);
      await cartsApi.update(req.params.id, cart);
      res.json(cart);
    } else if (process.env.DB === "fileSystem") {
      let cart = await cartsApi.listarID(req.params.id);
      let product = await productosApi.listarID(req.body.id);

      cart.productos.push(product);
      await cartsApi.update(req.params.id, cart);
      fs.writeFileSync("fs/carritos.json", JSON.stringify(cart, null, 2));
      res.json(cart);
    } else {
      let cart = await cartsApi.listarID(req.params.id);
      let product = await productosApi.listarID(req.body.id);

      cart[0].productos.push(product[0]);
      await cartsApi.update(req.params.id, cart[0]);
      res.json(cart);
    }
  });

  cart.get("/:id/productos", async (req, res) => {
    const cart = await cartsApi.listarID(req.params.id);
    res.json(cart.productos);
  });

  cart.delete("/:id/productos/:id_prod", async (req, res) => {
    let cart = await cartsApi.listarID(req.params.id);
    console.log(cart.productos);
    cart.productos = await productosApi.deleteById(req.params.id_prod);
    await cartsApi.update(req.params.id, cart);
    res.json(cart[0]);
  });
};
