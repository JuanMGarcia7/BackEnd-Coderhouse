import contenedorMongo from "../../contenedores/contenedorMongo.js";

export default class ProdDaoMongo extends contenedorMongo {
  constructor() {
    super("productos");
  }
}
