import fs from "fs";
import moment from "moment";
import config from "../../config/index.js";

export default class contenedorFS {
  constructor(path) {
    this.ruta = path;
  }

  async listarID(id) {
    const objs = await this.listarAll();
    const buscado = objs.find((o) => o.id == id);
    return buscado;
  }

  async listarAll() {
    try {
      const objs = fs.readFileSync(this.ruta, "utf-8");
      return JSON.parse(objs);
    } catch (error) {
      return "eror";
    }
  }

  async save(obj) {
    const objs = await this.listarAll();
    obj.timestamp = moment(new Date()).format("DD/MM/YY HH:mm");
    obj.productos = [];

    let newId;
    if (objs.length == 0) {
      newId = 1;
    } else {
      newId = objs[objs.length - 1].id + 1;
    }

    const newObj = { ...obj, id: newId };
    objs.push(newObj);

    fs.writeFileSync(this.ruta, JSON.stringify(objs, null, 2), (err) => {
      if (err) {
        console.log(err);
      }
    });

    return newObj;
  }

  async update(id, elem) {
    const objs = await this.listarAll();
    let idBuscado = id;
    console.log(idBuscado);

    const index = objs.findIndex((p) => p.id == idBuscado);
    if (index !== -1) {
      if (elem.title) {
        objs[index].title = elem.title;
      }
      if (elem.price) {
        objs[index].price = elem.price;
      }
      if (elem.thumbnail) {
        objs[index].thumbnail = elem.thumbnail;
      }
      fs.writeFileSync(this.ruta, JSON.stringify(objs, null, 2));
      return this.listarID(id);
    } else {
      return { error: `Producto ${idBuscado} no encontrado` };
    }
  }

  async deleteById(id) {
    const objs = await this.listarAll();
    const index = objs.findIndex((o) => o.id == id);
    if (index == -1) {
      throw new Error(`Error al borrar: no se encontró el id ${id}`);
    }

    objs.splice(index, 1);
    try {
      fs.writeFileSync(this.ruta, JSON.stringify(objs, null, 2));
      return `ID:${id} borrado`;
    } catch (error) {
      throw new Error(`Error al borrar: ${error}`);
    }
  }

  async deleteAll() {
    try {
      fs.writeFileSync(this.ruta, JSON.stringify([], null, 2));
      return "Se ha eliminado la informacion";
    } catch (error) {
      throw new Error(`Error al borrar todo: ${error}`);
    }
  }
}
