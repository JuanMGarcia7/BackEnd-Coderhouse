const express = require("express");

const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

const contenedor = require("./contenedores/ContenedorMDB.js");
const file = new contenedor();

const contenedorMessages = require("./contenedores/ContenedorSQLITE.js");
const messages = new contenedorMessages();

const PORT = 8080 || process.env.PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

io.on("connection", async (socket) => {
  console.log("Nueva conexion");

  file.listarAll().then((res) => socket.emit("productos", res));

  socket.on("newItem", (producto) => {
    file.guardar(producto.title, producto.price, producto.thumb);
    io.sockets.emit("productos", file.getAll());

    file.listarAll().then((res) => io.sockets.emit("productos", res));
  });
  messages.crearTableMsg();
  messages.listarAll().then((res) => socket.emit("messages", res));

  socket.on("newMessage", async (mensaje) => {
    mensaje.fyh = new Date().toLocaleString();
    mensaje.socketId = socket.id;

    await messages.save(mensaje);

    messages.listarAll().then((res) => io.sockets.emit("messages", res));
  });
});

const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
