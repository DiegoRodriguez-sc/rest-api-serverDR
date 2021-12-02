const { Schema, model } = require("mongoose");

const CategorieSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es requerido"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

CategorieSchema.methods.toJSON = function() {
  const { __v, _id, ...categoria  } = this.toObject();
  categoria.uid = _id;
  return categoria;
}

module.exports = model("Categorie", CategorieSchema);
