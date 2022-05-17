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

  /*   borrarPorId(id) {
    const cart = this.listarAll();
    const index = cart.findIndex((cart) => cart.id == id);
    if (index !== -1) {
      cart.splice(index, 1);
      fs.writeFileSync(this.ruta, JSON.stringify(cart, null, 2));
      return cart;
    } else {
      console.log("Cart inexistente");
    }
  } */
}

export default ContenedorCartMongoDB;
