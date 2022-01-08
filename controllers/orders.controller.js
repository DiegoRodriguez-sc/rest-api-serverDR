const { request, response } = require("express");
const Order = require("../models/order");

// methods

const getOrders = async (req = request, res = response) => {

  const query = { state: true };
  const orders = await Order.find(query)
                .populate("user", "name")
                .populate("list", ["name","price"]);
  const total = await Order.countDocuments(query);
  
  res.status(200).json({
    total,
    orders
  });
};

const postOrders = async (req = request, res = response) => {

  const { state, user, ...body } = req.body;

  const data = {
    ...body,
    user: req.user._id,
  };
  const orders = new Order(data);
  await orders.save();

  res.status(201).json({
    msg: "orden creada",
    orders
  });
};

const putOrders = async (req = request, res = response) => {
  res.status(200).json({
    msg: "put orders",
  });
};

const deleteOrders = async (req = request, res = response) => {

  const { id } = req.params;
  const orders = await Order.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json({
    msg: "orden borrada orders",
    orders,
  });
};

module.exports = {
  getOrders,
  postOrders,
  putOrders,
  deleteOrders,
};
