import contenedorFirebase from "../../contenedores/contenedorFirebase.js";

export default class ProdDaoFB extends contenedorFirebase {
  constructor() {
    super("productos");
  }
}
