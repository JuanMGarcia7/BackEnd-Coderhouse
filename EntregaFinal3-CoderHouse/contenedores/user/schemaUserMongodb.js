/* import mongodb from "../../config/config.js";
import mongoose from "mongoose"; */
const mongodb = require("../../config/config.js");
const mongoose = require("mongoose");
const { Schema } = mongoose;
mongoose.connect(`${mongodb.conexion}`);

const usersSchema = new Schema({
  email: { type: String, required: true },
  contraseña: { type: String, required: true },
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  direccion: { type: String, required: true },
  numeroDeTelefono: { type: Number, required: true },
  foto: { type: String, required: true },
  id: { type: Number, required: true },
});

usersSchema.methods.comparePassword = function (contraseña) {
  return bcrypt.compareSync(contraseña, this.contraseña);
};
const users = mongoose.model("users", usersSchema);

module.exports = users;
