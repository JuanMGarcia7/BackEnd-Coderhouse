const Koa = require("koa");
const koaBody = require("koa-body");
const router = require("./api/routes/prodRoutes.js");
const app = new Koa();

app.use(koaBody());

app.use(router.routes());

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

server.on("error", (error) => console.log("error en el sv KOA", error));
