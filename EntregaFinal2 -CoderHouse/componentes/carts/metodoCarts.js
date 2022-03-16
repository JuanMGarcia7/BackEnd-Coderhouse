import { Router } from "express";
import { cartsDao, productsDao } from "../../daos/index.js";

const cart = new Router();
export default (app) => {
  app.use("/api/carrito", cart);

  cart.get("/", async (req, res) => {
    res.json(await cartsDao.listarAll());
  });

  cart.get("/:id", async (req, res) => {
    res.json(await cartsDao.listarID(req.params.id));
  });

  cart.post("/", async (req, res) => {
    res.json(await cartsDao.save(req.body));
  });

  cart.delete("/", async (req, res) => {
    res.json(await cartsDao.deleteAll());
  });

  cart.delete("/:id", async (req, res) => {
    res.json(await cartsDao.deleteById(req.params.id));
  });

  // Products in cart
  cart.post("/:id/productos", async (req, res) => {
    const cart = await cartsDao.listarID(req.params.id);
    const product = await productsDao.listarID(req.body.id);
    cart.productos.push(product);
    await cartsDao.update(req.params.id, cart);
    res.json(cart);
  });

  cart.get("/:id/productos", async (req, res) => {
    const cart = await cartsDao.list(req.params.id);
    res.json(cart.products);
  });

  cart.delete("/:id/products/:id_prod", async (req, res) => {
    const cart = await cartsDao.listarID(req.params.id);
    /*  const index = cart.productos.findIndex(
      (id) => id.productos == req.params.productCode
    );
    if (index != -1) {
      cart.productos.splice(index, 1);
      await cartsDao.update(req.params.id, cart);
    } */
    const buscado = await cartsDao.deleteById(req.params.id_prod);
    res.json(cart);
  });
};
