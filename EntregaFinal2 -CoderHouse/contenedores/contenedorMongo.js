const mongoose = require("mongoose");
const connectMongo = require("../configs/ConfigMongoose");
const productModel = require("../src/productoModel.js");

await connectMongo;

export default class MongoContainer {
  constructor() {}

  async guardar(newElement) {
    newElement.timestamp = moment(new Date()).format("DD/MM/YY HH:mm");
    try {
      const nuevoProd = await productModel.create(newElement);
      console.log(nuevoProd);
    } catch (error) {
      throw new Error(`Error al crear: ${error}`);
    }
  }

  async listarAll() {
    try {
      let listaDeProds = await productModel.find({});
      console.log(listaDeProds);
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async listarID(id) {
    try {
      let prodBuscado = await productModel.find({ _id: id });
      if (prodBuscado.length == 0) {
        console.log("Producto no encontrado");
      } else {
        console.log(prodBuscado);
      }
    } catch (error) {
      console.error(`Error al listar el producto: ${error}`);
    }
  }

  async update(id, newData) {
    try {
      await productModel.replaceOne({ _id: id }, newData);
      const prodActualizado = await productModel.find({ _id: id });
      console.log(prodActualizado);
    } catch (error) {
      console.error(`Error al actualizar ${error}`);
    }
  }

  async deleteAll() {
    try {
      await productModel.deleteMany({});
      console.log("Productos eliminados");
    } catch (error) {
      console.error(`Error al borrar ${error}`);
    }
  }

  async deleteById(id) {
    try {
      await productModel.deleteOne({ _id: id });
      console.log("Producto eliminado");
    } catch (error) {
      console.error(`Error al borrar ${error}`);
    }
  }
}
