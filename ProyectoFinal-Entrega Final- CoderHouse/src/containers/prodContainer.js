const products = require("../models/schemaProd.js");
const logger = require("../logs/logs.js");

class ContenedorProd {
  constructor() {}

  async listAll() {
    try {
      return await products.find({});
    } catch (error) {
      throw new Error(logger.error(`Error al listar todo: ${error}`));
    }
  }
  async findByNombre(nombre) {
    try {
      return await products.find({ nombre: nombre });
    } catch (error) {
      throw new Error(logger.error(`Error al listar: ${error}`));
    }
  }
  async findByID(id) {
    try {
      return await products.find({ _id: id });
    } catch (error) {
      throw new Error(logger.error(`Error al listar: ${error}`));
    }
  }

  async save(newElement) {
    try {
      return await products.create(newElement);
    } catch (error) {
      throw new Error(logger.error(`Error al guardar: ${error}`));
    }
  }
  async deleteOne(id) {
    try {
      await products.deleteOne({ _id: id });
    } catch (error) {
      new Error(logger.error(`Error al borrar ${error}`));
    }
  }
}

module.exports = ContenedorProd;
