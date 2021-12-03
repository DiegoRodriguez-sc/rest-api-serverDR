const { request, response } = require("express");
const Categorie = require("../models/categorie");

const getCategories = async (req = request, res = response) => {
  const query = { state: true };
  const categories = await Categorie.find(query).populate("user", "name");
  const todos = await Categorie.countDocuments(query);

  res.status(200).json({
    todos,
    data: categories,
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

const putCategories = async (req = request, res = response) => {
  const name = req.body.name.toUpperCase();
  const { id } = req.params;
  const categorie = await Categorie.findByIdAndUpdate(id, { name });

  res.status(201).json({
    msg: "Categoria actualizada",
    categorie,
  });
};

const deleteCategories = async(req = request, res = response) => {
  const { id } = req.params;
  const category = await Categorie.findByIdAndUpdate(id, { state: false });

  res.status(200).json({
    msg: "Categoria borrado",
    category,
  });
};

module.exports = {
  getCategories,
  getCategoriesID,
  postCategories,
  putCategories,
  deleteCategories,
};
