const { request, response } = require("express");

// methods

const getOrders = async (req = request, res = response) => {
  res.status(200).json({
    msg: "get orders",
  });
};

const postOrders = async (req = request, res = response) => {
  res.status(201).json({
    msg: "post orders",
  });
};

const putOrders = async (req = request, res = response) => {
  res.status(200).json({
    msg: "put orders",
  });
};

const deleteOrders = async (req = request, res = response) => {
  res.status(200).json({
    msg: "delete orders",
    user,
  });
};

module.exports = {
  getOrders,
  postOrders,
  putOrders,
  deleteOrders,
};
