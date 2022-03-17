import mongoose from "mongoose";
import config from "../../config/index.js";
import moment from "moment";

await mongoose.connect(`${config.mongodb.conexion}`);

export default class contenedorMongo {
  constructor(nombre, schema) {
    this.coleccion = mongoose.model(nombre, schema);
  }

  async save(newElement) {
    newElement.timestamp = moment(new Date()).format("DD/MM/YY HH:mm");
    try {
      const nuevoProd = await this.coleccion.create(newElement);
      console.log(nuevoProd);
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
      let prodBuscado = await this.coleccion.find({ _id: id });
      if (prodBuscado.length == 0) {
        return "Producto no encontrado";
      } else {
        return prodBuscado;
      }
    } catch (error) {
      console.error(`Error al listar el producto: ${error}`);
    }
  }

  async update(id, newData) {
    try {
      await this.coleccion.replaceOne({ _id: id }, newData);
      const prodActualizado = await this.coleccion.find({ _id: id });
      return prodActualizado;
    } catch (error) {
      console.error(`Error al actualizar ${error}`);
    }
  }

  async deleteAll() {
    try {
      await this.coleccion.deleteMany({});
      return "Productos eliminados";
    } catch (error) {
      console.error(`Error al borrar ${error}`);
    }
  }

  async deleteById(id) {
    try {
      await this.coleccion.deleteOne({ _id: id });
      return "Producto eliminado";
    } catch (error) {
      console.error(`Error al borrar ${error}`);
    }
  }
}
