const { cart, cartSchema } = require("../schemas/schemaCartMongoDB.js");
const ContenedorCartMongoDB = require("../containers/cartMongoDB.js");

class cartDaoMongo extends ContenedorCartMongoDB {
  constructor() {
    super("carts", cartSchema);
  }
}

module.exports = cartDaoMongo;
