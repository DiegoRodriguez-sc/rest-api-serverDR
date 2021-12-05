const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  email: {
    type: String,
    unique:true,
    required: [true, "El correo es requerido"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es requerida"],
  },
  role: {
    type: String,
    default:"USER_ROLE",
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuarioSchema.methods.toJSON = function() {
  const { __v, password, state, _id, ...usuario  } = this.toObject();
  usuario.uid = _id;
  return usuario;
}

module.exports = model("User", UsuarioSchema);
