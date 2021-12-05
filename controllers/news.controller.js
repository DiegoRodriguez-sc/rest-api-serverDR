const { request, response } = require("express");
const New = require("../models/new");

const getNews = async (req = request, res = response) => {
  const query = { state: true };
  const news = await New.find(query).populate("user", "name");
  const todos = await New.countDocuments(query);

  res.status(200).json({
    todos,
    data: news,
  });
};

const getNewsID = (req = request, res = response) => {
  res.status(200).json({
    msg: "get actividades por id",
  });
};

const postNews = async (req = request, res = response) => {
  const { title, description, img } = req.body;

  const data = {
    title,
    description,
    img,
    user: req.user._id,
  };

  const news = new New(data);
  await news.save();

  res.status(201).json({
    msg: "Actividad creada",
    news,
  });
};

const putNews = async (req = request, res = response) => {
  const newNew = req.body;
  const { id } = req.params;
  const news = await New.findByIdAndUpdate(id, newNew, {
    new: true,
  });

  res.status(201).json({
    msg: "Novedad actualizada",
    news,
  });
};

const deleteNews = async (req = request, res = response) => {
  const { id } = req.params;
  const news = await New.findByIdAndUpdate(id, { state: false }, { new: true });

  res.status(200).json({
    msg: "Novedad borrada",
    news,
  });
};

module.exports = {
  getNews,
  getNewsID,
  postNews,
  putNews,
  deleteNews,
  getNews,
};
