const express = require("express");
const { Router } = express;
const fs = require("fs");
const handlebars = require("express-handlebars");

class Contenedor {
  constructor(nombre, lista) {
    (this.nombre = nombre), (this.lista = lista);
  }
}

const app = express();
const router = Router();
const cargaProd = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));

//VER CUANDO SIRVA
/* cargaProd.get("/", (req, res) => {
  this.lista = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));
  this.lista.forEach((prod) => {
    res.render("datos", {
      title: prod.title,
      price: prod.price,
      thumbnail: prod.thumbnail,
    });
  });
});
cargaProd.get("/", (req, res) => {
  this.lista = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));
  const prods = this.lista;

  res.render("vista", {
    productos: prods,
    hayProductos: prods.length,
  });
});
 */

app.get("/productos", (req, res) => {
  this.lista = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));
  const prods = this.lista;

  res.render("vista", {
    productos: prods,
    hayProductos: prods.length,
  });
});
//metodo POST
cargaProd.post("/", (req, res) => {
  this.lista = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));
  const newProd = req.body;
  newProd.id = this.lista.length + 1;
  this.lista.push(newProd);
  fs.writeFileSync("./productos.txt", JSON.stringify(this.lista));
  res.send(this.lista);
});

const contenedor = new Contenedor("Listado", []);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use("/productos", cargaProd);
app.use("/api/productos", router);
app.listen(8080, console.log("runnning"));
app.use(express.static("public"));
