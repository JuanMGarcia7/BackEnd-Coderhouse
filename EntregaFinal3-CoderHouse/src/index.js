/* import express from "express";
import login from "../routes/login.js";
import singup from "../routes/singup.js";
import homeRouter from "../routes/home.js";
import logout from "../routes/logout.js";
import cartRout from "../routes/cart.js";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import logger from "../public/js/logs.js";
import cluster from "cluster";
import { cpus } from "os";
import HttpServer from "http"; */

const express = require("express");
const login = require("../routes/login.js");
const singup = require("../routes/singup.js");
const homeRouter = require("../routes/home.js");
const logout = require("../routes/logout.js");
const cartRout = require("../routes/cart.js");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cluster = require("cluster");
const { Server: HttpServer } = require("http");
const { cpus } = require("os");
const logger = require("../public/js/logs.js");

const numCPUs = cpus().length;

const app = express();
const httpServer = new HttpServer(app);

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(login);
app.use(singup);
app.use(homeRouter);
app.use(logout);
app.use(cartRout);

app.set("view engine", "ejs");

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "shhhhhhhhhhhhhhhhhhhhh",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

/* 
if (process.env.MODO === "true") {
  app.listen(port, () => {
    logger.info(`Server is run on port ${port} in proces ${process.pid}`);
  });
} else {
  app.listen(port, () => {
    logger.info(`server corriendo en  ${port} con id proceso ${process.pid}`);
  });
} */

if (process.env.MODO == "CLUSTER") {
  httpServer.listen(port, () => {
    logger.info(`Server is run on port ${port} in proces ${process.pid}`);
  });
  httpServer.on("error", (error) => logger.error(`Error en servidor ${error}`));
} else {
  if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, Code, signal) => {
      logger.error(`worker ${worker.process.pid} finalizo`);
    });
  } else {
    httpServer.listen(port, () => {
      logger.info(`server corriendo en  ${port} con id proceso ${process.pid}`);
    });
    httpServer.on("error", (error) =>
      logger.error(`Error en servidor ${error}`)
    );
  }
}
