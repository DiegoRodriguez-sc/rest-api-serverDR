const { Schema, model } = require("mongoose");

const OrganizationSchema = Schema({
  title: {
    type: String,
    required: [true, "El título es obligatorio"],
  },
  msgWelcome: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  description: { type: String },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  logo: { type: String, required: true },
  facebookUrl: { type: String, required: true },
  linkedinUrl: { type: String, required: true },
});

OrganizationSchema.methods.toJSON = function () {
  const { __v, _id, ...organization } = this.toObject();
  organization.uid = _id;
  return organization;
};

module.exports = model("Organization", OrganizationSchema);
