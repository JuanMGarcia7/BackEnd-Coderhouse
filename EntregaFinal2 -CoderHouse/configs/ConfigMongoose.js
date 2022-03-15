import mongoose from "mongoose";
import { productModel } from "../src/productoModel.js";

/* const URL = "mongodb://localhost/ecommerce"; */
const URL =
  " mongodb+srv://Juanma:Barcelonafc97@cluster0.2f7ty.mongodb.net/DBEcommerce?retryWrites=true&w=majority";

const connectMongo = mongoose
  .connect(URL)
  .then(() => {
    console.log(`Base de datos conectada en ${URL}`);
  })
  .catch((err) => {
    console.log("Error al conectar");
  });

module.exports = connectMongo;
