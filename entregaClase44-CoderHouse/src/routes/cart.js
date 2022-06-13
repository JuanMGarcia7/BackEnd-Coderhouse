const { Router } = require("express");
const cartRout = new Router();

const {
  getCart,
  compraRealizada,
  deleteCart,
} = require("../controllers/cartController.js");

cartRout.get("/cart", getCart);

cartRout.post("/compra-realizada", compraRealizada);

cartRout.post("/carrito-vacio", deleteCart);

module.exports = cartRout;
