/* import mongodb from "../../config/config.js";
import mongoose from "mongoose"; */
const mongodb = require("../../config/config.js");
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(`${mongodb.conexion}`);

const cartSchema = new Schema({
  productos: { type: Array, required: true },
  id: { type: Number, required: true },
});

const cart = mongoose.model("carts", cartSchema);

module.exports = cart;
