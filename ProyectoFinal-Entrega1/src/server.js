const express = require("express");
const { Router } = express;

//seteando las router
const app = express();
const prod = Router();
const cart = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static("public"));

app.use("/api/productos", require("./routers/prod.js"));
app.use("/api/carrito", require("./routers/carrito.js"));

app.listen(8080, console.log("runnning"));
