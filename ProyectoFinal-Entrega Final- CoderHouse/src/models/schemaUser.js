const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
  email: { type: String, required: true },
  contraseña: { type: String, required: true },
  nombre: { type: String, required: true },
  edad: { type: Number, required: true },
  direccion: { type: String, required: true },
  phone: { type: Number, required: true },
  foto: { type: String, required: true },
  id: { type: Number, required: true },
});

usersSchema.methods.comparePassword = function (contraseña) {
  return bcrypt.compareSync(contraseña, this.contraseña);
};
const users = mongoose.model("users", usersSchema);

module.exports = users;
