const express = require("express");
const router = express.Router();
const fs = require("fs");

const ContenedorCart = require("../Contenedores/apiCart.js");
const apiCart = new ContenedorCart();

const ContenedorProducts = require("../Contenedores/apiProds.js");
const apiProds = new ContenedorProducts();

//---------------------------METODOS PARA API/CARRITO --------------------------

//METODO POST
router.post("/", (req, res) => {
  let respuesta = apiCart.crear();
  res.send("El ID del carrito es: " + respuesta);
});

//METODO DELETE

router.delete("/:id", (req, res) => {
  let id = req.params.id;

  res.send(apiCart.borrarPorId(id));
});
//LLEGUE HASTA ACA
//METODO GET

router.get("/:id/productos", (req, res) => {
  const cart = apiCart.listarAll();
  let id = req.params.id;
  const prodEnId = cart[prodID - 1];

  if (req.params && req.params.id <= cart.length) {
    res.send(prodEnId);
  } else {
    res.send("No se encuentra ese ID");
  }
});
//METODO POST CON PROD

router.post("/:id/productos", (req, res) => {
  const cart = apiCart.listarAll();
  let prodID = req.params.id;
  const newProd = req.body;
  const id = cart[prodID - 1];
  newProd.id = id.length + 1;
  cart[prodID - 1].push(newProd);
  fs.writeFileSync("./cart.txt", JSON.stringify(cart));
  const prodEnId = cart[prodID - 1];

  res.send(prodEnId);
});
//METODO DELETE CON ID

router.delete("/:id/productos/:id_prod", (req, res) => {
  const cart = apiCart.listarAll();
  let cartID = req.params.id;
  let itemToDelete = cart[cartID - 1];
  let prodID = req.params.id_prod;
  itemToDelete.splice(prodID - 1, 1);
  for (let i = parseInt(prodID) - 1; i < itemToDelete.length; i++) {
    itemToDelete[i].id = i + 1;
  }
  cart[cartID - 1] = itemToDelete;
  fs.writeFileSync("./cart.txt", JSON.stringify(cart));
  res.send(cart[cartID - 1]);
});

module.exports = router;
