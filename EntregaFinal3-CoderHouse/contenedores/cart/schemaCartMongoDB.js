import Joi from "joi";
import mongodb from "../../config/config.js";
import mongoose from "mongoose";
const { Schema } = mongoose;

mongoose.connect(`${mongodb.conexion}`);

const cartSchema = new Schema({
  productos: { type: Array, required: true },
  id: { type: Number, required: true },
});

const cart = mongoose.model("carts", cartSchema);

export default cart;
