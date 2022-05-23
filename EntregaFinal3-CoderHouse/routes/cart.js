const { Router } = require("express");
const path = require("path");
const ContenedorCartMongoDB = require("../contenedores/cart/cartMongoDB.js");
const { client, transporter } = require("../public/js/msjCarrito.js");
const logger = require("../public/js/logs.js");
const cart = require("../contenedores/cart/schemaCartMongoDB.js");

const cartRout = new Router();
const carts = new ContenedorCartMongoDB();
const TEST_MAIL = "jmanuelgarciaa7@gmail.com";

cartRout.get("/cart", async (req, res) => {
  const cartTotal = await carts.listAll();

  if (cartTotal.length == 0) {
    res.render(path.join(process.cwd(), "/public/views/pages/cartVacio.ejs"));
  } else {
    res.render(path.join(process.cwd(), "/public/views/pages/cart.ejs"), {
      hayProductos: cartTotal.length,
      productos: cartTotal[0].productos /* CHEQUEAR ESTOOOOOO */,
      nombreUsuario: req.session?.email,
    });
  }
});

cartRout.post("/compra-realizada", async (req, res) => {
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
    logger.info(message);
    logger.info("EMAIL ENVIADO!");
  } catch (error) {
    logger.error(error);
  }
  await carts.deleteAll();
  res.sendFile(path.join(process.cwd(), "/public/views/compra.html"));
});

cartRout.post("/carrito-vacio", async (req, res) => {
  await carts.deleteAll();
  res.redirect("/home");
});

module.exports = cartRout;
