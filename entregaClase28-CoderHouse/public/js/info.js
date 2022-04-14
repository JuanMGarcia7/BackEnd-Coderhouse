const { Router } = require("express");

const path = require("path");

const infoRouter = new Router();

const argumentoDeEntrada = process.argv;
const pathDeEjecucion = process.cwd();
const sistOp = process.platform;
const ProcID = process.pid;
const nodeVersion = process.version;
const carpetaDelProyecto = process.cwd();
const memTotal = process.memoryUsage();

infoRouter.get("/info", (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/info.ejs"), {
    argumentoDeEntrada: argumentoDeEntrada,
    pathDeEjecucion: pathDeEjecucion,
    sistOp: sistOp,
    ProcID: ProcID,
    nodeVersion: nodeVersion,
    carpetaDelProyecto: carpetaDelProyecto,
    memTotal: memTotal,
  });
  console.log(ProcID);
});

module.exports = infoRouter;
