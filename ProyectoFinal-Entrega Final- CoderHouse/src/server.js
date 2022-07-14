const express = require("express");
const { Server: HttpServer } = require("http");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const logger = require("./logs/logs.js");
const homeRouter = require("./routes/home.js");
const cartRout = require("./routes/cart.js");
const login = require("./routes/login.js");
const singin = require("./routes/singin.js");
const logOut = require("./routes/logout.js");
const { cpus } = require("os");
const connectDB = require("./utils/connectMongo.js");
const numCPUs = cpus().length;
const dotenv = require("dotenv");
dotenv.config();
const SocketIO = require("socket.io");
const cluster = require("cluster");

const app = express();
const port = process.env.PORT;
const httpServer = new HttpServer(app);

app.use(
  session({
    cookie: { maxAge: 600000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGOURL }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

connectDB();

app.use(homeRouter);
app.use(cartRout);
app.use(login);
app.use(singin);
app.use(logOut);

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

//sockets

const io = SocketIO(httpServer);

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("chat:message", (data) => {
    io.sockets.emit("chat:message", data);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
