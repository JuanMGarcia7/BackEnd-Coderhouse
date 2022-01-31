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

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);
//VER CUANDO SIRVA
cargaProd.get("/", (req, res) => {
  this.lista = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));
  const prods = this.lista;
  prods.forEach((prod) => {
    res.render("datos", {
      productos: prods,
      hayProductos: prods.length,
    });
  });
});
cargaProd.get("/", (req, res) => {
  this.lista = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));
  const prods = this.lista;

  res.render("datos", {
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

app.set("view engine", "hbs");
app.set("views", "./views");
app.use("/productos", cargaProd);
app.use("/api/productos", router);
app.listen(8080, console.log("runnning"));
app.use(express.static("public"));
