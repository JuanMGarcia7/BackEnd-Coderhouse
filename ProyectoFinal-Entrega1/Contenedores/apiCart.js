const fs = require("fs");

class ContenedorCart {
  constructor(nombre, lista) {
    this.nombre = nombre;
    this.lista = lista;
  }
  //para el GET

  listarAll() {
    const objs = JSON.parse(fs.readFileSync("./cart.txt", "utf-8"));
    return objs;
  }
}

const contenedor = new ContenedorCart("Listado", []);
module.exports = ContenedorCart;
