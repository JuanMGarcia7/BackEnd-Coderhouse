import contenedorMongo from "../contenedores/contenedorMongo.js";
import cartSchema from "./cartSchema.js";

export default class CarritoDaoMongo extends contenedorMongo {
  constructor() {
    super("carts", cartSchema);
  }
}
