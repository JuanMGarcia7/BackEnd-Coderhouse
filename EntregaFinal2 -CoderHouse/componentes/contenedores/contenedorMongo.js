import mongoose from "mongoose";
import config from "../../config/index.js";
import moment from "moment";

await mongoose.connect(`${config.mongodb.conexion}`);
let id = 0;
export default class contenedorMongo {
  constructor(nombre, schema) {
    this.coleccion = mongoose.model(nombre, schema);
  }

  async save(newElement) {
    id++;
    newElement.productos = [];
    newElement.timestamp = moment(new Date()).format("DD/MM/YY HH:mm");
    newElement.id = id;
    try {
      const nuevoProd = await this.coleccion.create(newElement);

      return nuevoProd;
    } catch (error) {
      throw new Error(`Error al crear: ${error}`);
    }
  }

  async listarAll() {
    try {
      let listaDeProds = await this.coleccion.find({});
      return listaDeProds;
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async listarID(id) {
    try {
      let prodBuscado = await this.coleccion.find({ id: parseInt(id) });
      return prodBuscado;
    } catch (error) {
      console.error(`Error al listar: ${error}`);
    }
  }

  async update(id, newData) {
    try {
      newData.id = parseInt(id);
      await this.coleccion.replaceOne({ id: parseInt(id) }, newData);
      const prodActualizado = await this.coleccion.find({ id: parseInt(id) });
      return prodActualizado;
    } catch (error) {
      console.error(`Error al actualizar ${error}`);
    }
  }

  async deleteAll() {
    try {
      id = 0;
      await this.coleccion.deleteMany({});
      return "Eliminados";
    } catch (error) {
      console.error(`Error al borrar ${error}`);
    }
  }

  async deleteById(id) {
    try {
      await this.coleccion.deleteMany({ id: parseInt(id) });
      return `El id:${id} fue eliminado`;
    } catch (error) {
      console.error(`Error al borrar ${error}`);
    }
  }

  async DeletProdInCart(id) {
    try {
      await this.coleccion.deleteMany({ id: parseInt(id) });
      return `El id:${id} fue eliminado`;
    } catch (error) {
      console.error(`Error al borrar ${error}`);
    }
  }
}
