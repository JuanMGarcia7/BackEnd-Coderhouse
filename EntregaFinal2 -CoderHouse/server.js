import carrito from "./routers/carrito.js";
import productos from "./routers/productos.js";
import express from "express";

/* const express = require("express"); */

const app = express();
carrito(app);
productos(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080 || process.env.PORT;
app.listen(PORT, () => console.log(`Servido escuchando en el puerto ${PORT}`));
