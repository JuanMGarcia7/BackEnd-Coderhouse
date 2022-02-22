const express = require("express");
const { Router } = express;
const fs = require("fs");
const handlebars = require("express-handlebars");

//seteando las router
const app = express();
const prod = Router();
const cart = Router();

const ContenedorProducts = require("../Contenedores/apiProds.js");
const ContenedorCart = require("../Contenedores/apiCart.js");
const Administrador = require("../public/js/admin.js");
/* const admin = new Administrador(); PARA MAS ADELANTE*/
const admin = true;

const apiProds = new ContenedorProducts();
const apiCart = new ContenedorCart();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);

//-------------------METODOS PARA API/PRODUCTOS
//METODO GET

prod.get("/:id?", (req, res) => {
  const prods = apiProds.listarAll();
  const prodBuscado = prods[req.params.id - 1];
  if (req.params && req.params.id <= prods.length) {
    res.send(prodBuscado);
  } else {
    res.send("No esta ese ID");
  }
});

//METODO POST
prod.post("/", (req, res) => {
  if (admin) {
    const prods = apiProds.listarAll();
    const newProd = req.body;
    newProd.id = prods.length + 1;
    newProd.timeStamp = Date.now();
    prods.push(newProd);
    fs.writeFileSync("./productos.txt", JSON.stringify(prods));
    res.send(newProd);
  } else {
    ("No tiene derechos de administrador");
  }
});

//METODO PUT
prod.put("/:id", (req, res) => {
  if (admin) {
    const prods = apiProds.listarAll();
    let prodID = req.params.id;
    prods[prodID - 1] = req.body;
    prods[prodID - 1].id = req.params.id;
    prods[prodID - 1].timestamp = Date.now();

    fs.writeFileSync("./productos.txt", JSON.stringify(prods), (err) => {
      if (err) console.log(err);
    });
    res.send(prods);
  } else {
    ("No tiene los derechos de admin");
  }
});

//METODO DELETE
prod.delete("/:id", (req, res) => {
  if (admin) {
    let prodID = req.params.id;
    apiProds.borrar(prodID);
    res.send("borrado");
  } else {
    ("No tiene derechos de admin");
  }
});

//---------------------------METODOS PARA API/CARRITO --------------------------

//METODO POST BASE
cart.post("/", (req, res) => {
  const cart = apiCart.listarAll();
  const newCart = [];
  let totalCart = new Object();
  totalCart.productos = req.body;
  totalCart.id = cart.length + 1;
  totalCart.timeStamp = Date.now();
  newCart.push(totalCart);
  cart.push(newCart);
  fs.writeFileSync("./cart.txt", JSON.stringify(cart));

  //NO ME FUNCIONA
  res.send(totalCart.id);
});

//METODO DELETE

cart.delete("/:id", (req, res) => {
  const cart = apiCart.listarAll();
  let prodID = req.params.id;
  cart.splice(prodID - 1, 1);
  for (let i = parseInt(prodID - 1); i < cart.length; i++) {
    cart[i][0].id = i + 1;
  }
  fs.writeFileSync("./cart.txt", JSON.stringify(cart));

  res.send(cart);
});

//METODO GET

cart.get("/:id/productos", (req, res) => {
  const cart = apiCart.listarAll();
  let prodID = req.params.id;
  const prodEnId = cart[prodID - 1];

  if (req.params && req.params.id <= cart.length) {
    res.send(prodEnId);
  } else {
    res.send("No se encuentra ese ID");
  }
});
//METODO POST CON PROD

cart.post("/:id/productos", (req, res) => {
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

cart.delete("/:id/productos/:id_prod", (req, res) => {
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

app.use("/api/productos", prod);
app.use("/api/carrito", cart);
app.set("view engine", "hbs");
app.set("views", "./views");

app.listen(8080, console.log("runnning"));
