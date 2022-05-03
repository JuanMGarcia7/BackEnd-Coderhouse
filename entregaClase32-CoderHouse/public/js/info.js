const { Router } = require("express");
const { cpus } = require("os");
const compression = require("compression");

const path = require("path");

const infoRouter = new Router();

const argumentoDeEntrada = process.argv;
const pathDeEjecucion = process.cwd();
const sistOp = process.platform;
const ProcID = process.pid;
const nodeVersion = process.version;
const carpetaDelProyecto = process.cwd();
const numCPUs = cpus().length;
const memTotal = process.memoryUsage();

infoRouter.get("/info", compression(), (req, res) => {
  res.render(path.join(process.cwd(), "/views/pages/info.ejs"), {
    argumentoDeEntrada: argumentoDeEntrada,
    pathDeEjecucion: pathDeEjecucion,
    sistOp: sistOp,
    ProcID: ProcID,
    nodeVersion: nodeVersion,
    carpetaDelProyecto: carpetaDelProyecto,
    memTotal: memTotal,
    numCPUs: numCPUs,
  });
  console.log(ProcID);
});

module.exports = infoRouter;
