const { products, prodSchema } = require("../schema/prodSchema.js");
const ContenedorProdMongoDB = require("../containers/prodMongo.js");

class prodDaoMongo extends ContenedorProdMongoDB {
  constructor() {
    super("products", prodSchema);
  }
}

module.exports = prodDaoMongo;
