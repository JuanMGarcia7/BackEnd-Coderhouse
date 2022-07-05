const { Router } = require("express");
const {
  getHome,
  postProducts,
  addToCart,
  findById,
  getGamer,
  getOficina,
} = require("../controllers/prodController.js");
const checkAuthentication = require("../utils/isAuth.js");

const homeRouter = new Router();

homeRouter.get("/home", checkAuthentication, getHome);

homeRouter.get("/categorias/gamer", checkAuthentication, getGamer);

homeRouter.get("/categorias/oficina", checkAuthentication, getOficina);

homeRouter.get("/home/:id", checkAuthentication, findById);

homeRouter.post("/home", postProducts);

homeRouter.post("/productos/:id", addToCart);
module.exports = homeRouter;
