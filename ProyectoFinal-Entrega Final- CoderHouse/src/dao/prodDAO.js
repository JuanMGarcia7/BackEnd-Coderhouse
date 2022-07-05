const { products, prodSchema } = require("../models/schemaProd.js");
const ContenedorProd = require("../containers/prodContainer.js");

class prodDaoMongo extends ContenedorProd {
  constructor() {
    super("products", prodSchema);
  }
}

module.exports = prodDaoMongo;
