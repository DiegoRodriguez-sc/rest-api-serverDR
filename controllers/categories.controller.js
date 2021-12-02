const { request, response } = require("express");
const Categorie = require("../models/categorie");

const getCategories = (req = request, res = response) => {
  res.status(200).json({
    msg: "get categorias",
  });
};
const getCategoriesID = (req = request, res = response) => {
  const { id } = req.params;

  res.status(200).json({
    msg: "get categorias por id",
    id,
  });
};
const postCategories = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();

  const categoryDB = await Categorie.findOne({ name });

  if (categoryDB) {
    return res.status(400).json({
      msg: `La categoria ${name} ya existe`,
    });
  }

  const data = {
    name,
    user: req.user._id,
  };

  const category = new Categorie(data);

  await category.save();
  res.status(201).json({
    msg: "Categoria creada",
    category,
  });
};
const putCategories = (req = request, res = response) => {
  const category = req.body;
  const { id } = req.params;

  res.status(201).json({
    msg: "put categorias",
    id,
    category,
  });
};
const deleteCategories = (req = request, res = response) => {
  const { id } = req.params;

  res.status(200).json({
    msg: "delete categorias",
    id,
  });
};

module.exports = {
  getCategories,
  getCategoriesID,
  postCategories,
  putCategories,
  deleteCategories,
};
