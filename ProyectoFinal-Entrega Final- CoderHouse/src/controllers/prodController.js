const { Router } = require("express");
const path = require("path");
const logger = require("../logs/logs.js");
const ProdDAO = require("../dao/prodDAO.js");
const cartDAO = require("../dao/cartDAO.js");

let productosApi = new ProdDAO();
let cartsApi = new cartDAO();

const getHome = async (req, res) => {
  const listaProductos = await productosApi.listAll();
  res.render(path.join(process.cwd(), "/public/views/pages/home.ejs"), {
    productos: listaProductos,
    hayProductos: listaProductos.length,
    email: req.user._conditions.email,
  });
};
const getGamer = async (req, res) => {
  const listaProductos = await productosApi.listAll();

  let filtrado = listaProductos.filter(
    (producto) => producto.categoria == "Gamer"
  );
  res.render(path.join(process.cwd(), "/public/views/pages/gamer.ejs"), {
    hayProductos: filtrado.length,
    productos: filtrado,
    email: req.user._conditions.email,
  });
};
const getOficina = async (req, res) => {
  const listaProductos = await productosApi.listAll();

  let filtrado = listaProductos.filter(
    (producto) => producto.categoria == "Oficina"
  );
  res.render(path.join(process.cwd(), "/public/views/pages/oficina.ejs"), {
    hayProductos: filtrado.length,
    productos: filtrado,
    email: req.user._conditions.email,
  });
};

const postProducts = async (req, res) => {
  const listaProductos = await productosApi.listAll();

  const producto = {
    id: req.body.id,
    nombre: req.body.nombre,
    precio: req.body.precio,
    categoria: req.body.categoria,
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

const findById = async (req, res) => {
  let idProdBuscado = req.params.id;
  const listarBuscado = await productosApi.findByID(idProdBuscado);
  res.send(listarBuscado);
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
module.exports = {
  getHome,
  postProducts,
  addToCart,
  findById,
  getGamer,
  getOficina,
};
