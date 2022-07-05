const { Router } = require("express");
const cartRout = new Router();
const checkAuthentication = require("../utils/isAuth.js");

const {
  getCart,
  compraRealizada,
  deleteCart,
  deleteProdCart,
} = require("../controllers/cartController.js"); //importamos los controladores, para que quede mas limpio y sencillo el codigo, y las rutas en si mismas

cartRout.get("/cart", checkAuthentication, getCart);

cartRout.post("/cart/delete/:nombre", deleteProdCart);

cartRout.post("/compra-realizada", compraRealizada);

cartRout.post("/carrito-vacio", deleteCart);

module.exports = cartRout;
