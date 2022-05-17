import { Router } from "express";
import path from "path";
import ContenedorCartMongoDB from "../contenedores/cart/cartMongoDB.js";
import { client, transporter } from "../public/js/msjCarrito.js";
import webAuth from "../public/auth/index.js";

const cartRout = new Router();
const carts = new ContenedorCartMongoDB();
const TEST_MAIL = "tomasdiab@gmail.com";

cartRout.get("/cart", webAuth, async (req, res) => {
  const cartTotal = await carts.listAll();
  console.log(cartTotal);
  res.render(path.join(process.cwd(), "/public/views/pages/cart.ejs"), {
    productos: cartTotal[0].productos /* CHEQUEAR ESTOOOOOO */,
    hayProductos: cartTotal.length,
    nombreUsuario: req.session?.email,
  });
});
//COMO SACO LA INDEXACION??

cartRout.post("/compra-realizada", async (req, res) => {
  const mailOptions = {
    from: "Servidor Node.js",
    to: TEST_MAIL,
    subject: "Nuevo pedido",
    html: `<h1 style="color: blue;">Informacion de compra!</h1>
          <div>
           <ul>Datos:
           <li> Nombre:ACA VA EL NOMBRE</li>
           <li> Nombre:ACA VA EL EMAIL</li>
           <li> Nombre:ACA EL CARRO </li>
      
           </ul>
           </div>
           `,
  };
  const options = {
    body: `Nuevo pedido! 
        Nombre:nombre
        Email: email.
        Su compra:
        cart`,
    from: "whatsapp:+14155238886", //desde twilio
    to: "whatsapp:+5492281534787",
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    const message = await client.messages.create(options);
    console.log(message);
    console.log("EMAIL ENVIADO!");
  } catch (error) {
    console.log(error);
  }
  res.sendFile(path.join(process.cwd(), "/public/views/compra.html"));
});

export default cartRout;
