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

async function updateProducto({ _id, datos }) {
  /*   const prodBuscado = products.findOneAndUpdate(
    { id: id },
    new Producto(id, datos)
  );
  return prodBuscado; */
  //no funciona asi
  try {
    console.log(datos);
    console.log(_id);
    let productoActual = await products.findById(_id);
    if (!productoActual) {
      return false;
    }
    productoActual = await products.findByIdAndUpdate(_id, datos, {
      new: true,
      runValidators: true,
      useUnified: true,
    });
    return productoActual;
  } catch (error) {
    const err = "Error al actualizar";
    throw err;
  }
}

async function deleteProducto({ _id }) {
  /* const prodBuscado = await products.find({ id: id });
  await products.deleteOne({ id: id });

  //BORRA EN LA DB PERO NO RETORNA LO QUE CORRESPONDE
  return prodBuscado; */
  try {
    console.log(_id);
    const existe = await products.findById({ _id });
    if (!existe) {
      return false;
    }
    console.log("EXISTEE!!", existe);
    const deleted = await products.deleteOne({ _id: _id });
    return existe;
  } catch (error) {
    const err = error.message("error al borrar");
    throw err;
  }
}

module.exports = {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
};
