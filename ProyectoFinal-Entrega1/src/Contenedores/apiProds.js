const fs = require("fs");

class ContenedorProducts {
  constructor() {
    this.ruta = "src/persistenciaInfo/productos.json";
  }
  //para el GET
  listar(id) {
    const objs = this.listarAll();
    const buscado = objs.find((o) => o.id == id);
    return buscado;
  }

  listarAll() {
    const objs = JSON.parse(fs.readFileSync(this.ruta, "utf-8"));
    return objs;
  }

  //para el POST
  guardar(obj) {
    const objs = this.listarAll();

    let newId;
    if (objs.length == 0) {
      newId = 1;
    } else {
      newId = objs[objs.length - 1].id + 1;
    }

    const newObj = { ...obj, id: newId };
    objs.push(newObj);

    try {
      fs.writeFileSync(this.ruta, JSON.stringify(objs, null, 2));
      return newId;
    } catch (error) {
      throw new Error("Error al guardar");
    }
  }

  //para el DELETE
  borrar(id) {
    const objs = this.listarAll();
    const index = objs.findIndex((o) => o.id == id);
    if (index == -1) {
      throw new Error("Error detectado!");
    }

    objs.splice(index, 1);
    for (let i = parseInt(id) - 1; i < objs.length; i++) {
      objs[i].id = i + 1;
    }
    try {
      fs.writeFileSync(this.ruta, JSON.stringify(objs, null, 2));
    } catch (error) {
      throw new Error("Error detectado!");
    }
  }

  async borrarAll() {
    try {
      fs.writeFileSync(this.ruta, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error("Error detectado!");
    }
  }
}

module.exports = ContenedorProducts;
