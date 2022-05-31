const { Router } = require("express");

const {
  getHome,
  postProducts,
  addToCart,
} = require("../controllers/homeController.js");
const homeRouter = new Router();

homeRouter.get("/home", getHome);

homeRouter.post("/home", postProducts);

homeRouter.post("/productos/:id", addToCart);

module.exports = homeRouter;
