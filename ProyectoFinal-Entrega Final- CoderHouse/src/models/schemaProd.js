const mongoose = require("mongoose");
const { Schema } = mongoose;

const prodSchema = new Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { type: String, required: true },
  id: { type: Number, required: true },
});

const products = mongoose.model("products", prodSchema);

module.exports = products;
