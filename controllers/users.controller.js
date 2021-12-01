const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");

// methods

const getUsers = async(req = request, res = response) => {

  const query = {state:true};
  const users = await User.find(query);
  const todos = await User.countDocuments(query);
  res.status(200).json({
    total:todos,
    users
  });
};

const postUser = async (req = request, res = response) => {
  //TODO: añadir el rol
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });

  //encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // save DB
  await user.save();
  res.status(201).json({
    msg: "usuario creado",
    user,
  });
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, ...rest } = req.body;

  if (password) {
    // password encrypted
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest);
  res.status(200).json({
    msg: "usuario actualizado",
    user
  });
};

const deleteUser = async(req = request, res = response) => {

  const {id} = req.params;
  const user = await User.findByIdAndUpdate(id, {state:false});

  res.status(200).json({
    msg: "usuario borrado",
    user
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
