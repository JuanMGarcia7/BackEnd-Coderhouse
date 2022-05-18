import cart from "./schemaCartMongoDB.js";
import moment from "moment";
let id = 0;
class ContenedorCartMongoDB {
  constructor() {}

  async listAll() {
    try {
      return await cart.find({});
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async crear(newElement) {
    id++;
    newElement.productos = [];
    newElement.id = id;

    try {
      return await cart.create(newElement);
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }
  async update(id, newData) {
    try {
      await cart.updateOne({ id: id }, { $set: newData });
      console.log("deberia haber actualizado");
    } catch (error) {
      console.error(`Error al actualizar ${error}`);
    }
  }
  async deleteAll() {
    try {
      id = 0;
      await cart.deleteMany({});
      return "Eliminados";
    } catch (error) {
      console.error(`Error al borrar ${error}`);
    }
  }
}

export default ContenedorCartMongoDB;
