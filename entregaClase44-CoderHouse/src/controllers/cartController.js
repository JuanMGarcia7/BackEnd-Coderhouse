const { Router } = require("express");
const path = require("path");
const { client, transporter } = require("../../public/js/msjCarrito.js");
const logger = require("../logs/logs.js");
const { productosApi, cartsApi } = require("../factory/index.js");
const { cart } = require("../schemas/schemaCartMongoDB.js");
const TEST_MAIL = "jmanuelgarciaa7@gmail.com";

const getCart = async (req, res) => {
  const cartTotal = await cartsApi.listAll();

  if (cartTotal.length == 0) {
    res.render(path.join(process.cwd(), "/public/views/pages/cartVacio.ejs"));
  } else {
    res.render(path.join(process.cwd(), "/public/views/pages/cart.ejs"), {
      hayProductos: cartTotal.length,
      productos: cartTotal[0].productos,
    });
  }
};

const compraRealizada = async (req, res) => {
  const cartTotal = await cart.find({});

  const mailOptions = {
    from: "Servidor Node.js",
    to: TEST_MAIL,
    subject: "Nuevo pedido",
    html: `<h3>Nuevo pedido:</h3>
    <br>
    <ul>
        ${cartTotal[0].productos.map(
          (p) => `<li>Producto: ${p.nombre} - Código:${p.id}</li>`
        )}
    </ul>`,
  };
  const options = {
    body: `Nuevo pedido! 
        Su compra:
       
        ${cartTotal[0].productos.map(
          (p) => `Producto: ${p.nombre} - Código:${p.id}`
        )}
    `,
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
module.exports = { getCart, compraRealizada, deleteCart };
