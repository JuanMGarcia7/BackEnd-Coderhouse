const dotenv = require("dotenv");
dotenv.config();
let productosApi;
let cartsApi;
if (`${process.env.DB}` === "mongodb") {
  const { default: ProdDaoMongo } = await import(
    "../componentes/productos/ProdDaoMongo.js"
  );
  const { default: CarritoDaoMongo } = await import(
    "../componentes/carts/CarritoDaoMongo.js"
  );
  productosApi = new ProdDaoMongo();
  cartsApi = new CarritoDaoMongo();
}
if (`${process.env.DB}` === "firebase") {
  const { default: ProdDaoFB } = await import(
    "../componentes/productos/ProdDaoFB.js"
  );
  const { default: CarritoDaoFB } = await import(
    "../componentes/carts/CarritoDaoFB.js"
  );
  productosApi = new ProdDaoFB();
  cartsApi = new CarritoDaoFB();
}

if (`${process.env.DB}` === "fileSystem") {
  const { default: ProdDaoFS } = await import(
    "../componentes/productos/ProdDaoFS.js"
  );
  const { default: CarritoDaoFS } = await import(
    "../componentes/carts/CarritoDaoFS.js"
  );
  productosApi = new ProdDaoFS();
  cartsApi = new CarritoDaoFS();
}
export { productosApi, cartsApi };
