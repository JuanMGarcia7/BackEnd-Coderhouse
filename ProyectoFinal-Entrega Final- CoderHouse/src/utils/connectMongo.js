const mongoose = require("mongoose");
const mongodb = require("../../config/config.js");
const logger = require("../logs/logs.js");

const connectDB = async () => {
  try {
    await mongoose.connect(`${mongodb.conexion}`);
    logger.info("Conectado a la base de datos MONGO");
  } catch (error) {
    console.log("Error al conectar a la base de datos MONGO");
    process.exit(1);
  }
};

module.exports = connectDB;
