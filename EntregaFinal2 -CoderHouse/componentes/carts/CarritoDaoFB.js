import contenedorFirebase from "../../contenedores/contenedorFirebase.js";

export default class CarritoDaoFB extends contenedorFirebase {
  constructor() {
    super("carts");
  }
}
