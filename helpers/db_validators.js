const Categorie = require("../models/categorie");
const Product = require("../models/product");
const User = require("../models/user");

//verify user email
const emailExists = async (email = "") => {
  const mail = await User.findOne({ email });
  if (mail) {
    throw new Error(`El correo: ${email} ya esta registrado`);
  }
};

//verify user id in bd
const idUserExists = async (id) => {
  const idUser = await User.findById(id);
  if (!idUser) {
    throw new Error(`El id: ${id} no existe`);
  }
};

//verify category id
const idCategorieExists = async (id) => {
  const idCategorie = await Categorie.findById(id);
  if (!idCategorie) {
    throw new Error(`El id: ${id} no existe`);
  }
};

//verify product id
const idProductExists = async (id) => {
  const idProduct = await Product.findById(id);
  if (!idProduct) {
    throw new Error(`El id: ${id} no existe`);
  }
};

module.exports = {
  emailExists,
  idUserExists,
  idCategorieExists,
  idProductExists
};
