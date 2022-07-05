const { cart, cartSchema } = require("../models/schemaCart.js");
const ContenedorCart = require("../containers/cartContainer.js");

class cartDaoMongo extends ContenedorCart {
  constructor() {
    super("carts", cartSchema);
  }
}

module.exports = cartDaoMongo;
