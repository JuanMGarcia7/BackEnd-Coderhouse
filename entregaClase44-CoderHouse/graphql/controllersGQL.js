const products = require("../src/schemas/schemaProdMongoDB.js");
const { productosApi, cartsApi } = require("../src/factory/index.js");

class Producto {
  constructor(id, { nombre, precio }) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
  }
}

async function getProductos({ campo, valor }) {
  const listaProductos = await productosApi.listAll();
  return listaProductos;

  //FUNCIONA CORRECTAMENTE
}

async function getProducto({ id }) {
  const prodBuscado = await products.find({ id: id });
  if (prodBuscado) {
    return prodBuscado[0];
  } else {
    throw new Error("Persona not found.");
  }
  //FUNCIONA CORRECTAMENTE
}

async function createProducto({ datos }) {
  const productos = await products.find({});

  const id = productos.length + 1;
  const nuevoProducto = new Producto(id, datos);

  return await products.create(nuevoProducto);
  //FUNCIONA CORRECTAMENTE
}

async function updateProducto({ id }) {
  const prodBuscado = products.findOneAndUpdate(
    { id: id },
    new Producto(id, datos)
  );
  return prodBuscado;
  //no funciona asi
}

async function deleteProducto({ id }) {
  const prodBuscado = await products.find({ id: id });
  await products.deleteOne({ id: id });

  //BORRA EN LA DB PERO NO RETORNA LO QUE CORRESPONDE
  return prodBuscado;
}

module.exports = {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
};
