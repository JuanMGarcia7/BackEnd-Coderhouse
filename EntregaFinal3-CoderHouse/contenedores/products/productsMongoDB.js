import products from "./schemaProdMongoDB.js";

class ContenedorProdMongoDB {
  constructor() {}

  async listAll() {
    try {
      return await products.find({});
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }
  async findByNombre(nombre) {
    try {
      return await products.find({ nombre: nombre });
    } catch (error) {
      throw new Error(`Error al listar: ${error}`);
    }
  }

  async save(newElement) {
    try {
      return await products.create(newElement);
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }
}

export default ContenedorProdMongoDB;
