import dotenv from "dotenv";
dotenv.config();

/* let prodDao;
let cartsDao;

if (`${process.env.DB}` === "mongodb") {
  const { default: ProdDaoMongo } = await import(
    "../componentes/productos/ProdDaoMongo.js"
  );
  const { default: CarritoDaoMongo } = await import(
    "../componentes/carts/CarritoDaoMongo.js"
  );
  prodDao = new ProdDaoMongo();
  cartsDao = new CarritoDaoMongo();
}

if (`${process.env.DB}` === "firebase") {
  const { default: ProdDaoFB } = await import(
    "../componentes/productos/ProdDaoFB.js"
  );
  const { default: CarritoDaoFB } = await import(
    "../componentes/carts/CarritoDaoFB.js"
  );
  prodDao = new ProdDaoFB();
  cartsDao = new CarritoDaoFB();
}

export { prodDao, cartsDao }; */

let productsDao;
let cartsDao;

if (`${process.env.DB}` === "mongodb") {
  const { default: ProdDaoMongo } = await import(
    "../componentes/productos/ProdDaoMongo.js"
  );
  const { default: CarritoDaoMongo } = await import(
    "../componentes/carts/CarritoDaoMongo.js"
  );
  productsDao = new ProdDaoMongo();
  cartsDao = new CarritoDaoMongo();
}

// Si la DB es Firebase
if (`${process.env.DB}` === "firebase") {
  const { default: ProductsDaoFirebase } = await import(
    "../componentes/productos/ProdDaoFB.js"
  );
  const { default: CarritoDaoFB } = await import(
    "../componentes/carts/CarritoDaoFB.js"
  );
  productsDao = new ProductsDaoFirebase();
  cartsDao = new CarritoDaoFB();
}

export { productsDao, cartsDao };
