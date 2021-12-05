const { Schema, model } = require("mongoose");

const ContactSchema = Schema({
  email: {
    type: String,
    required: [true, "El correo es obligatorio"]
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  asunto: { type: String },
  msg: { type: String },
});

ContactSchema.methods.toJSON = function () {
  const { __v, _id, state, ...contact } = this.toObject();
  contact.uid = _id;
  return contact;
};

module.exports = model("Contact", ContactSchema);
