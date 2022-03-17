const fs = require("fs");

class ContenedorCart {
  constructor() {
    this.ruta = "src/persistenciaInfo/cart.json";
  }
  //para el GET
  crear() {
    const cart = this.listarAll();
    const newCart = {};
    newCart.productos = [];
    newCart.id = cart.length + 1;
    newCart.timeStamp = Date.now();

    cart.push(newCart);
    fs.writeFileSync(this.ruta, JSON.stringify(cart, null, 2));

    return newCart.id;
  }

  listarAll() {
    const objs = JSON.parse(fs.readFileSync(this.ruta, "utf-8"));
    return objs;
  }
  borrarPorId(id) {
    const cart = this.listarAll();
    const index = cart.findIndex((cart) => cart.id == id);
    if (index !== -1) {
      cart.splice(index, 1);
      fs.writeFileSync(this.ruta, JSON.stringify(cart, null, 2));
      return cart;
    } else {
      console.log("Cart inexistente");
    }
  }
}

const contenedor = new ContenedorCart("Listado", []);
module.exports = ContenedorCart;
