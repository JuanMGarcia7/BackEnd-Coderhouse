const { Router } = require("express");

const {
  getHome,
  postProducts,
  addToCart,
  getById,
} = require("../controllers/homeController.js");
const homeRouter = new Router();

homeRouter.get("/home", getHome);

homeRouter.get("/home/:id", getById);

homeRouter.post("/home", postProducts);

homeRouter.post("/productos/:id", addToCart);

module.exports = homeRouter;
