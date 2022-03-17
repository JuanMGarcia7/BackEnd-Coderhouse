import contenedorMongo from "../contenedores/contenedorMongo.js";
import prodSchema from "./prodSchema.js";

export default class ProdDaoMongo extends contenedorMongo {
  constructor() {
    super("productos", prodSchema);
  }
}
