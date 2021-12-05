const { Schema, model } = require("mongoose");

const ActivitieSchema = Schema({
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
  category: {
    type: Schema.Types.ObjectId,
    ref: "Categorie",
    required: true,
  },
  description: { type: String },
  img: { type: String, default:null },
});

ActivitieSchema.methods.toJSON = function () {
  const { __v, _id, state, ...activity } = this.toObject();
  activity.uid = _id;
  return activity;
};

module.exports = model("Activitie", ActivitieSchema);
