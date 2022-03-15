const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String, required: true },
});

const productModel = model("producos", productSchema);

module.exports = productModel;
