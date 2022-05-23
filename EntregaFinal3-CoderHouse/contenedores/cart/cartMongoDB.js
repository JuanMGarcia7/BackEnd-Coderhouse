const cart = require("./schemaCartMongoDB.js");
const logger = require("../../public/js/logs.js");
let id = 0;
class ContenedorCartMongoDB {
  constructor() {}

  async listAll() {
    try {
      return await cart.find({});
    } catch (error) {
      throw new Error(logger.error(`Error al listar todo: ${error}`));
    }
  }

  async crear(newElement) {
    id++;
    newElement.productos = [];
    newElement.id = id;

    try {
      return await cart.create(newElement);
    } catch (error) {
      throw new Error(logger.error(`Error al guardar: ${error}`));
    }
  }
  async update(id, newData) {
    try {
      await cart.updateOne({ id: id }, { $set: newData });
      logger.info("deberia haber actualizado");
    } catch (error) {
      new Error(logger.error(`Error al actualizar ${error}`));
    }
  }
  async deleteAll() {
    try {
      id = 0;
      await cart.deleteMany({});
      return logger.info("Eliminados");
    } catch (error) {
      new Error(logger.error(`Error al borrar ${error}`));
    }
  }
}

module.exports = ContenedorCartMongoDB;
