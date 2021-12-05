const { Schema, model } = require("mongoose");

const NewSchema = Schema({
  title: {
    type: String,
    required: [true, "El título es obligatorio"]
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: { type: String },
  img: { type: String, default:null },
});

NewSchema.methods.toJSON = function () {
  const { __v, _id, state, ...news } = this.toObject();
  news.uid = _id;
  return news;
};

module.exports = model("New", NewSchema);
