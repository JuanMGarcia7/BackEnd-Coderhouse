import { Router } from "express";
import { cartsDao, productsDao } from "../../daos/index.js";
import cartsApi from "../../daos/daoCarrito.js";
import productosApi from "../../daos/daoProductos.js";

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

  // Products in cart
  cart.post("/:id/productos", async (req, res) => {
    let cart = await cartsApi.listarID(req.params.id);
    let product = await productosApi.listarID(req.body.id);

    cart[0].productos.push(product[0]);
    await cartsApi.update(req.params.id, cart[0]);
    res.json(cart[0]);
  });

  cart.get("/:id/productos", async (req, res) => {
    const cart = await cartsApi.list(req.params.id);
    res.json(cart.productos);
  });

  cart.delete("/:id/products/:id_prod", async (req, res) => {
    const cart = await cartsApi.listarID(req.params.id);
    /*  const index = cart.productos.findIndex(
      (id) => id.productos == req.params.productCode
    );
    if (index != -1) {
      cart.productos.splice(index, 1);
      await cartsDao.update(req.params.id, cart);
    } */
    const buscado = await cartsApi.deleteById(req.params.id_prod);
    res.json(cart, buscado);
  });
};
