const express = require("express");
const Router = require("express");
const { faker } = require("@faker-js/faker");
const moment = require("moment");
const { normalize, schema, denormalize } = require("normalizr");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const util = require("util");
const authHome = require("../public/js/auth.js");
const homeWebRouter = require("../public/js/home.js");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const dotenv = require("dotenv");
dotenv.config();

const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

const ContenedorMemoria = require("../contenedores/ContenedorMemoria.js");
const ContenedorArchivo = require("../contenedores/ContenedorMsjsMDB.js");

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

    const normalizedData = normalize(originalData, centroDeMensajes);
    print(normalizedData);

    /*     const desnormalizedData = denormalize(
      normalizedData.result,
      centroDeMensajes,
      normalizedData.entities
    );*/

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
  console.log(`Escuchando en ${connectedServer.address().port}`);
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

//pruebas
app.set("view engine", "ejs");
app.use(authHome);
app.use(homeWebRouter);

//=============PASSPORT ==========================

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL:
        "http://localhost:8080/auth/facebook/callback" /* VER PARA CAMBIAR */,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/login",
    successRedirect: "/datos",
  })
);
app.get("/datos", (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.render("datos.ejs", {
      nombre: req.user.displayName,
      foto: req.user.photos[0].value,
    });
  }
});
//=============PASSPORT ==========================
