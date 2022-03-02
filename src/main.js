//SACAR? COMPRAR CON INDEX.JS

/* const express = require("express");

const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

const ContenedorMemoria = require("../contenedores/ContenedorMemoria.js");
const ContenedorArchivo = require("../contenedores/ContenedorArchivo.js");
const ContenedorMDB = require("../contenedores/ContenedorMDB.js");
const ContenedorSQLITE = require("../contenedores/ContenedorSQLITE.js");
const { mdb } = require("../options/mariaDB.js");
const { sql3 } = require("../options/sqlite3.js");

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const productosApi = new ContenedorMDB(mdb);
const mensajesApi = new ContenedorSQLITE(sql3);
mensajesApi.createTable();

 mensajesApi.createTable(); 

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!");

  socket.emit("productos", productosApi.listarAll());

  socket.on("update", (producto) => {
    productosApi.guardar(producto);
    io.sockets.emit("productos", productosApi.listarAll());
  });

  socket.emit("mensajes", await mensajesApi.listarAll());

  socket.on("nuevoMensaje", async (mensaje) => {
    mensaje.fyh = new Date().toLocaleString();
    await mensajesApi.guardar(mensaje);
    io.sockets.emit("mensajes", await mensajesApi.listarAll());
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const PORT = 8080;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(
    `Servidor http escuchando en el puerto ${connectedServer.address().port}`
  );
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);
 */
