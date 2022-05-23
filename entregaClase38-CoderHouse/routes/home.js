const { Router } = require("express");
const path = require("path");
const ContenedorProdMongoDB = require("../contenedores/controllers/productsMongoDB.js");
const ContenedorCartMongoDB = require("../contenedores/controllers/cartMongoDB.js");
const logger = require("../public/js/logs.js");

const homeRouter = new Router();
const productos = new ContenedorProdMongoDB();
const carts = new ContenedorCartMongoDB();

homeRouter.get("/home", async (req, res) => {
  const listaProductos = await productos.listAll();
  res.render(path.join(process.cwd(), "/public/views/pages/home.ejs"), {
    productos: listaProductos,
    hayProductos: listaProductos.length,
    nombreUsuario: req.session?.email,
  });
});

//solo nosotros desde postman
homeRouter.post("/home", async (req, res) => {
  const listaProductos = await productos.listAll();

  const producto = {
    id: req.body.id,
    nombre: req.body.nombre,
    precio: req.body.precio,
  };
  const yaExiste = listaProductos.find((e) => e.nombre == producto.nombre);

  if (yaExiste) {
    return logger.error("Ya existe este producto");
  } else {
    productos.save(producto);
  }

  logger.info("Producto agregado a la base de datos!");
  res.send(producto);
});
//
homeRouter.post("/productos/:id", async (req, res) => {
  const prodID = req.params.id;

  const carrito = await carts.listAll();
  if (carrito.length === 0) {
    const newElement = {};
    await carts.crear(newElement);
    logger.info("Cart creado");
  } else {
    logger.error("ya tenes un carrito");
  }
  const listaCarrito = await carts.listAll();

  //HASTA ACA CREA EL CARRITO, O VERIFICA SI NO TENES UNO.
  const listaProductos = await productos.listAll();
  const yaExiste = listaProductos.find((e) => e._id == prodID);

  listaCarrito[0].productos.push(yaExiste);

  const cartActualizado = await carts.update(
    listaCarrito[0].id,
    listaCarrito[0]
  );
  res.redirect("/home");
});

module.exports = homeRouter;
