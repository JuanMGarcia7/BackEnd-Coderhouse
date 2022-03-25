const express = require("express");
const Router = require("express");
const { faker } = require("@faker-js/faker");
const moment = require("moment");
const { normalize, schema, denormalize } = require("normalizr");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const util = require("util");

const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

const ContenedorMemoria = require("../contenedores/ContenedorMemoria.js");
const ContenedorArchivo = require("../contenedores/ContenedorMsjsMDB.js");
const { Long } = require("mongodb");

const prodFaker = new Router();
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const productosApi = new ContenedorMemoria();
const mensajesApi = new ContenedorArchivo();

//--normalizr
function print(objeto) {
  console.log(util.inspect(objeto, false, 12, true));
}

const autor = new schema.Entity("autor", {}, { idAttribute: "email" });
const texto = new schema.Entity(
  "texto",
  { autor: autor },
  { idAttribute: "id" }
);
const centroDeMensajes = new schema.Entity(
  "centroDeMensajes",
  {
    autores: [autor],
    mensajes: [texto],
  },
  { idAttribute: "id" }
);

//Fin normalizr

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.emit("productos", productosApi.listarAll());

  socket.on("update", (producto) => {
    productosApi.guardar(producto);
    io.sockets.emit("productos", productosApi.listarAll());
  });

  socket.emit("mensajes", await mensajesApi.listAll());

  socket.on("nuevoMensaje", async (mensaje) => {
    mensaje.fyh = moment().format("MMMM Do YYYY, h:mm:ss a");
    await mensajesApi.save(mensaje);
    const originalData = await mensajesApi.listAll();
    console.log(JSON.stringify(originalData).length);
    const normalizedData = normalize(originalData, centroDeMensajes);
    print(normalizedData);
    console.log(JSON.stringify(normalizedData).length);
    /*     const desnormalizedData = denormalize(
      normalizedData.result,
      centroDeMensajes,
      normalizedData.entities
    );
    console.log(JSON.stringify(desnormalizedData).length); */
    io.sockets.emit("mensajes", await mensajesApi.listAll());
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/productos-test", prodFaker);
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://Juanma:Barcelonafc97@cluster0.2f7ty.mongodb.net/sessions?retryWrites=true&w=majority",
    }),
    secret: "shhhhhhhhhhhhhhhhhhhhh",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);

//prod con faker
let id = 0;
function generarCombinacion() {
  return {
    id: id++,
    title: faker.commerce.product(),
    price: faker.commerce.price,
    thumbnail: faker.image.imageUrl(),
  };
}

function generarProductosFk(cantidad) {
  const productos = [];
  for (let i = 0; i < cantidad; i++) {
    productos.push(generarCombinacion());
  }
  return productos;
}

prodFaker.use("/", (req, res) => {
  let prods = generarProductosFk(5);
  /*   prods.forEach((prod) => {
    res.render("productos", {
      productos: prods,
      hayProductos: prods.length,
    });
  }); */
  res.json(prods);
});
