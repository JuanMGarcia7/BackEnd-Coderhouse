import config from "../../config/index.js";
import contenedorFS from "../contenedores/contenedorFS.js";

export default class CarritoDaoFS extends contenedorFS {
  constructor() {
    super(config.fileSystem.carritosPath);
  }
}
