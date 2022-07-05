const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  productos: { type: Array, required: true },
  id: { type: Number, required: true },
});

const cart = mongoose.model("carts", cartSchema);

module.exports = { cart, cartSchema };
