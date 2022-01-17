const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 8080 || process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));

class Contenedor {
  constructor(nombre, lista) {
    (this.nombre = nombre), (this.lista = lista);
  }
}

app.get("/productos", (req, res) => {
  this.lista = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));
  res.send(this.lista);
});

app.get("/productosRandom", (req, res) => {
  this.lista = JSON.parse(fs.readFileSync("./productos.txt", "utf-8"));

  function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const prodRandom = this.lista.find((el) => el.id === random(1, 3));
  res.send(prodRandom);
});

const contenedor = new Contenedor("Listado", []);
