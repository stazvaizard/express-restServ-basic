const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    require: [true, "El correo es obligatorio"],
    uniqued: true,
  },
  password: {
    type: String,
    required: [true, "La constraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
    enum: ["ADMIN_ROLE", "USER_ROL"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("Usuario", usuarioSchema);
