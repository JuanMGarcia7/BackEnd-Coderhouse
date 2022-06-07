const dotenv = require("dotenv");
dotenv.config();
let productosApi;
let cartsApi;

if (`${process.env.DB}` === "MONGODB") {
  const ProdDaoMongo = require("../dao/prodDaoMongo.js");
  const cartDaoMongo = require("../dao/cartDaoMongo.js");

  productosApi = new ProdDaoMongo();
  cartsApi = new cartDaoMongo();
}
module.exports = { productosApi, cartsApi };
