const Joi = require("joi");
const { mongodb } = require("../config/index.js");
const mongoose = require("mongoose");

mongoose.connect(`${mongodb.conexion}`);

const email = Joi.string().min(4).required();
const fyh = Joi.string().min(4).required();
const autor = Joi.object({
  email: email,
}).required();
const texto = Joi.string().min(4).required();

const messageSchema = {
  autor,
  fyh,
  texto,
};

const Messages = mongoose.model("mensajes", messageSchema);

module.exports = Messages;
