const { products } = require("../schema/prodSchema.js");

class ContenedorProdMongoDB {
  constructor() {}

  async listAll() {
    try {
      return await products.find({});
    } catch (error) {
      throw console.log(`Error al listar todo: ${error}`);
    }
  }
  async findByNombre(nombre) {
    try {
      return await products.find({ nombre: nombre });
    } catch (error) {
      throw console.log(`Error al listar todo: ${error}`);
    }
  }

  async save(newElement) {
    try {
      return await products.create(newElement);
    } catch (error) {
      throw console.log(`Error al listar todo: ${error}`);
    }
  }

  async delete(id) {
    try {
      return await products.findOneAndDelete({ _id: id });
    } catch (error) {
      throw console.log(`Error al listar todo: ${error}`);
    }
  }
}

module.exports = ContenedorProdMongoDB;
