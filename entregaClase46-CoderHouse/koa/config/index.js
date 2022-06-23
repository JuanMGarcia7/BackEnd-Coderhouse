const dotenv = require("dotenv");
dotenv.config();
const MONGO_DB = process.env.MONGOURL;

const mongodb = {
  conexion:
    "mongodb+srv://Juanma:Barcelonafc97@cluster0.2f7ty.mongodb.net/EntregaFinal3?retryWrites=true&w=majority",
};
module.exports = mongodb;
