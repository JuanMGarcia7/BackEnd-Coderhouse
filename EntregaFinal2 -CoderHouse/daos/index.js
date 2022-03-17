import dotenv from "dotenv";
dotenv.config();

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

  cartsDao = new CarritoDaoFB();
}

export { productsDao, cartsDao };
