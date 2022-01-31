const express = require("express");
const { Router } = express;
const fs = require("fs");

class Contenedor {
  constructor(nombre, lista) {
    (this.nombre = nombre), (this.lista = lista);
  }
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/static", express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

app.post("/productos", (req, res) => {
  this.lista = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));
  const newProd = req.body;
  newProd.id = this.lista.length + 1;
  this.lista.push(newProd);
  fs.writeFileSync("./productos.txt", JSON.stringify(this.lista));
  res.redirect("/");
});

app.get("/productos", (req, res) => {
  this.lista = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));
  const prods = this.lista;

  res.render("datos", {
    productos: prods,
    hayProductos: prods.length,
  });
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
