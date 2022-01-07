const { response } = require("express");
const Product = require("../models/product");


const getProducts = async (req, res = response) => {
  const query = { state: true };
  const product = await Product.find(query).populate("user", "name").populate("category", "name");
  const total = await Product.countDocuments(query);


  res.status(200).json({
    total,
    data: product,
  });
};

const getProductId = async (req, res = response) => {
  const { id } = req.params;
  const product = await Product.findById(id)
    .populate("user", "name")
    .populate("category", "name");

  res.status(200).json(product);
};

const postProduct = async (req, res = response) => {
  const { state, user, ...body } = req.body;

  const productoDB = await Product.findOne({ name: body.name });

  if (productoDB) {
    return res.status(400).json({
      msg: `El producto ${productoDB.name}, ya existe`,
    });
  }

  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id,
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json({
    msg: "Producto creado",
    product,
  });
};

const putProduct = async (req, res = response) => {
  const { id } = req.params;
  const { state, user, ...data } = req.body;

  if (data.name) {
    data.name = data.name.toUpperCase();
  }

  data.user = req.user._id;

  const product = await Product.findByIdAndUpdate(id, data, { new: true });

  res.status(201).json({
    msg: "Producto actualizado",
    product,
  });
};

const deleteProduct = async (req, res = response) => {
  const { id } = req.params;
  const productoBorrado = await Product.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json({
    msg: "Producto borrado",
    productoBorrado,
  });
};

module.exports = {
  getProducts,
  getProductId,
  postProduct,
  putProduct,
  deleteProduct,
};