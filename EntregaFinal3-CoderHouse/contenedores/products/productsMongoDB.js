const products = require("./schemaProdMongoDB.js");
const logger = require("../../public/js/logs.js");

class ContenedorProdMongoDB {
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

  async save(newElement) {
    try {
      return await products.create(newElement);
    } catch (error) {
      throw new Error(logger.error(`Error al guardar: ${error}`));
    }
  }
}

module.exports = ContenedorProdMongoDB;
