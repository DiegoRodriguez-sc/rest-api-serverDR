const { request, response } = require("express");
const Activitie = require("../models/activitie");

const getActivities = async (req = request, res = response) => {
  const query = { state: true };
  const activities = await Activitie.find(query)
    .populate("user", "name")
    .populate("category", "name");
  const todos = await Activitie.countDocuments(query);

  res.status(200).json({
    todos,
    data: activities,
  });
};

const getActivitiesID = (req = request, res = response) => {
  res.status(200).json({
    msg: "get actividades por id",
  });
};

const postActivities = async (req = request, res = response) => {
  const { title, description, img, category } = req.body;

  const data = {
    title,
    description,
    img,
    category,
    user: req.user._id,
  };

  const activity = new Activitie(data);
  await activity.save();

  res.status(201).json({
    msg: "Actividad creada",
    activity,
  });
};

const putActivities = async (req = request, res = response) => {
  const newActivity = req.body;
  const { id } = req.params;
  const activity = await Activitie.findByIdAndUpdate(id, newActivity, {
    new: true,
  });

  res.status(201).json({
    msg: "Actividad actualizada",
    activity,
  });
};

const deleteActivities = async(req = request, res = response) => {
  const { id } = req.params;
  const activity = await Activitie.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json({
    msg: "Actividad borrada",
    activity,
  });
};

module.exports = {
  getActivities,
  getActivitiesID,
  postActivities,
  putActivities,
  deleteActivities,
};
