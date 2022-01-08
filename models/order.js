const { Schema, model } = require("mongoose");
const product = require("./product");

const OrderSchema = Schema({
  list: [{
    type: Schema.Types.ObjectId,
    ref: "Product"
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  state: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  total:{
    type:Number,
    default:0
  }
});

OrderSchema.methods.toJSON = function () {
  const { __v, state, _id, ...orden } = this.toObject();
  orden.uid = _id;
  return orden;
};

module.exports = model("Order", OrderSchema);
