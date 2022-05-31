const { products, prodSchema } = require("../schemas/schemaProdMongoDB.js");
const ContenedorProdMongoDB = require("../containers/productsMongoDB.js");

class prodDaoMongo extends ContenedorProdMongoDB {
  constructor() {
    super("products", prodSchema);
  }
}

module.exports = prodDaoMongo;
