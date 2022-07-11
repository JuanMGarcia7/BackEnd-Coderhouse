const { Router } = require("express");
const path = require("path");
const logger = require("../logs/logs.js");
const ProdDAO = require("../dao/prodDAO.js");
const cartDAO = require("../dao/cartDAO.js");
const moment = require("moment");
const { cart } = require("../models/schemaCart.js");
const { transporter, client } = require("../utils/mensajesConfig.js");

let productosApi = new ProdDAO();
let cartsApi = new cartDAO();

const getCart = async (req, res) => {
  const cartTotal = await cartsApi.listAll();

  if (cartTotal.length == 0) {
    res.render(path.join(process.cwd(), "/public/views/pages/cartVacio.ejs"), {
      email: req.user._conditions.email,
    });
  } else {
    res.render(path.join(process.cwd(), "/public/views/pages/cart.ejs"), {
      hayProductos: cartTotal.length,
      productos: cartTotal[0].productos,
      email: req.user._conditions.email,
    });
  }
};

const deleteProdCart = async (req, res) => {
  let nombreProd = req.params.nombre;

  let cartTotal = await cartsApi.listAll();
  let listaProds = cartTotal[0].productos;

  let newArray = listaProds.filter(
    (producto) => producto.nombre !== nombreProd
  );
  cartTotal[0].productos = newArray;
  const cartActualizado = await cartsApi.update(cartTotal[0].id, cartTotal[0]); //se actualiza el carro, para ver si todavia tiene algun producto o no
  let cartNuevo = await cartsApi.listAll();

  if (cartNuevo[0].productos.length == 0) {
    await cartsApi.deleteAll();
    res.redirect("/home");
  } else {
    res.redirect("/cart");
  }
};
const compraRealizada = async (req, res) => {
  console.log(req.user);
  const TEST_MAIL = process.env.TEST_MAIL;

  const cartTotal = await cart.find({});
  const mailOptions = {
    from: "Servidor Node.js",
    to: TEST_MAIL,
    subject: "Nuevo pedido",
    html: `<h3>Nuevo pedido:</h3>
    Usuario: ${req.user._conditions.email}
    <br>
    Fecha: ${moment().format("MMMM Do YYYY, h:mm:ss a")}
    <br>
    <ul>
        ${cartTotal[0].productos.map(
          (p) => `<li>Producto: ${p.nombre} - Código:${p._id}</li>`
        )}
    </ul>`,
  };
  const options = {
    body: `Nuevo pedido!
      Usuario: ${req.user._conditions.email}
      Fecha: ${moment().format("MMMM Do YYYY, h:mm:ss a")}
        Su compra:
       
        ${cartTotal[0].productos.map(
          (p) => `Producto: ${p.nombre} - Código:${p._id}`
        )} `,
    from: "whatsapp:+14155238886",
    to: "whatsapp:+5492281534787",
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    const message = await client.messages.create(options);
    logger.info("WHATS APP ENVIADO!");
    logger.info("EMAIL ENVIADO!");
  } catch (error) {
    logger.error(error);
  }
  await cartsApi.deleteAll();
  res.sendFile(path.join(process.cwd(), "/public/views/compra.html"));
};

const deleteCart = async (req, res) => {
  await cartsApi.deleteAll();
  res.redirect("/home");
};
module.exports = { getCart, deleteProdCart, compraRealizada, deleteCart };
