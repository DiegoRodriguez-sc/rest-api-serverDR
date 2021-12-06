const { Schema, model } = require("mongoose");

const MemberSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"]
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
  urlFb:{type: String, required: true},
  urlLk:{type: String, required : true}
});

MemberSchema.methods.toJSON = function () {
  const { __v, _id, state, ...member } = this.toObject();
  member.uid = _id;
  return member;
};

module.exports = model("Member", MemberSchema);
