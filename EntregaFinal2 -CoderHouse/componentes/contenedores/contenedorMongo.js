import mongoose from "mongoose";
import config from "../../configs/index.js";
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
      console.log(listaDeProds);
    } catch (error) {
      throw new Error(`Error al listar todo: ${error}`);
    }
  }

  async listarID(id) {
    try {
      let prodBuscado = await this.coleccion.find({ _id: id });
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
      await this.coleccion.replaceOne({ _id: id }, newData);
      const prodActualizado = await this.coleccion.find({ _id: id });
      console.log(prodActualizado);
    } catch (error) {
      console.error(`Error al actualizar ${error}`);
    }
  }

  async deleteAll() {
    try {
      await this.coleccion.deleteMany({});
      console.log("Productos eliminados");
    } catch (error) {
      console.error(`Error al borrar ${error}`);
    }
  }

  async deleteById(id) {
    try {
      await this.coleccion.deleteOne({ _id: id });
      console.log("Producto eliminado");
    } catch (error) {
      console.error(`Error al borrar ${error}`);
    }
  }
}
