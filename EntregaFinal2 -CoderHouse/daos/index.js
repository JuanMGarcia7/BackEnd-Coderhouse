let productsDao;
let cartsDao;

if (`${process.env.DB}` === "mongodb") {
  const { default: ProdDaoMongo } = await import(
    "../componentes/productos/ProdDaoMongo"
  );
  const { default: CarritoDaoMongo } = await import(
    "../componentes/carts/CarritoDaoMongo.js"
  );
  productsDao = new ProdDaoMongo();
  cartsDao = new CarritoDaoMongo();
}

if (`${process.env.DB}` === "firebase") {
  const { default: ProdDaoFB } = await import(
    "../componentes/productos/ProdDaoFB.js"
  );
  const { default: CarritoDaoFB } = await import(
    "../componentes/carts/CarritoDaoFB.js"
  );
  productsDao = new ProdDaoFB();
  cartsDao = new CarritoDaoFB();
}

export { productsDao, cartsDao };
