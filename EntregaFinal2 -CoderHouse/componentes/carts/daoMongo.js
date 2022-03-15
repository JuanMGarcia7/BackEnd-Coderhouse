import contenedorMongo from "../../contenedores/contenedorMongo.js";

export default class CarritoDaoMongo extends contenedorMongo {
  constructor() {
    super("carts");
  }
}
