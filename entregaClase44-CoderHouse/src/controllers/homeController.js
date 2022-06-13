const { Router } = require("express");
const path = require("path");
const logger = require("../logs/logs.js");
const { productosApi, cartsApi } = require("../factory/index.js");

const getHome = async (req, res) => {
  const listaProductos = await productosApi.listAll();
  /* res.render(path.join(process.cwd(), "/public/views/pages/home.ejs"), {
    productos: listaProductos,
    hayProductos: listaProductos.length,
    nombreUsuario: req.session?.email,
  }); */
  res.send(listaProductos);
};

const postProducts = async (req, res) => {
  const listaProductos = await productosApi.listAll();

  const producto = {
    id: req.body.id,
    nombre: req.body.nombre,
    precio: req.body.precio,
  };
  const yaExiste = listaProductos.find((e) => e.nombre == producto.nombre);

  if (yaExiste) {
    return logger.error("Ya existe este producto");
  } else {
    productosApi.save(producto);
  }

  logger.info("Producto agregado a la base de datos!");
  res.send(producto);
};

const addToCart = async (req, res) => {
  const prodID = req.params.id;

  const carrito = await cartsApi.listAll();
  if (carrito.length === 0) {
    const newElement = {};
    await cartsApi.crear(newElement);
    logger.info("Cart creado");
  } else {
    logger.error("ya tenes un carrito");
  }
  const listaCarrito = await cartsApi.listAll();

  //HASTA ACA CREA EL CARRITO, O VERIFICA SI NO TENES UNO.
  const listaProductos = await productosApi.listAll();
  const yaExiste = listaProductos.find((e) => e._id == prodID);

  listaCarrito[0].productos.push(yaExiste);

  const cartActualizado = await cartsApi.update(
    listaCarrito[0].id,
    listaCarrito[0]
  );
  res.redirect("/home");
};

const getById = async (req, res) => {
  const IDProducto = req.params.id;
  const listaProductos = await productosApi.listAll();
  const yaExiste = listaProductos.find((e) => e.id == IDProducto);
  //para el put, modificar
  res.send(yaExiste);
};
module.exports = { getHome, postProducts, addToCart, getById };
