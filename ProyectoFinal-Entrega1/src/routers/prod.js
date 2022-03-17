const express = require("express");
const router = express.Router();
const fs = require("fs");

const ContenedorCart = require("../Contenedores/apiCart");
const apiCart = new ContenedorCart();

const ContenedorProducts = require("../Contenedores/apiProds.js");
const apiProds = new ContenedorProducts();

//-------------------METODOS PARA API/PRODUCTOS
//METODO GET
const admin = true;

router.get("/:id?", (req, res) => {
  const prods = apiProds.listarAll();
  const prodBuscado = prods[req.params.id - 1];
  if (req.params && req.params.id <= prods.length) {
    res.send(prodBuscado);
  } else {
    res.send("No esta ese ID");
  }
});

//METODO POST
router.post("/", (req, res) => {
  if (admin) {
    /*  const prods = apiProds.listarAll();
    const newProd = req.body;
    newProd.id = prods.length + 1;
    newProd.timeStamp = Date.now();
    prods.push(newProd);
    fs.writeFileSync("./productos.txt", JSON.stringify(prods));
    res.send(newProd); */
    const obj = {
      title: req.body.title,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
    };
    apiProds.guardar(obj);
    res.send(apiProds.listarAll());
  } else {
    ("No tiene derechos de administrador");
  }
});

//METODO PUT
router.put("/:id", (req, res) => {
  if (admin) {
    let prods = apiProds.listarAll();
    let prodID = req.params.id;
    let newProduct = req.body;
    /*   prods[prodID - 1] = req.body; */
    newProduct.id = req.params.id;
    newProduct.timeStamp = Date.now();
    if (newProduct.nombre != null) {
      prods[prodID - 1].nombre = newProduct.nombre;
    }
    if (newProduct.precio != null) {
      prods[prodID - 1].precio = newProduct.precio;
    }
    if (newProduct.stock != null) {
      prods[prodID - 1].stock = newProduct.stock;
    }
    if (newProduct.foto != null) {
      prods[prodID - 1].foto = newProduct.foto;
    }
    if (newProduct.codigo != null) {
      prods[prodID - 1].codigo = newProduct.codigo;
    }
    if (newProduct.descripcion != null) {
      prods[prodID - 1].descripcion = newProduct.descripcion;
    }
    prods[prodID - 1].timeStamp = newProduct.timeStamp;
    fs.writeFileSync("./productos.txt", JSON.stringify(prods), (err) => {
      if (err) console.log(err);
    });
    res.send(prods[prodID - 1]);
  } else {
    ("No tiene los derechos de admin");
  }
});

//METODO DELETE
router.delete("/:id", (req, res) => {
  if (admin) {
    let prodID = req.params.id;
    apiProds.borrar(prodID);
    res.send("borrado");
  } else {
    ("No tiene derechos de admin");
  }
});

module.exports = router;
