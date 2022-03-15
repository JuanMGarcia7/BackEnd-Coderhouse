let productsDao;
let cartsDao;

if (`${process.env.DB}` === "mongodb") {
  const { default: ProdDaoMongo } = await import(
    "../componentes/productos/daoMongo.js"
  );
  const { default: CarritoDaoMongo } = await import(
    "../componentes/carts/daoMongo.js"
  );
  productsDao = new ProdDaoMongo();
  cartsDao = new CarritoDaoMongo();
}

if (`${process.env.DB}` === "firebase") {
  const { default: ProdDaoFB } = await import(
    "../componentes/productos/daoFirebase.js"
  );
  const { default: CarritoDaoFB } = await import(
    "../componentes/carts/daoFirebase.js"
  );
  productsDao = new ProdDaoFB();
  cartsDao = new CarritoDaoFB();
}

export { productsDao, cartsDao };
