const { request, response } = require("express");
const Member = require("../models/member");

const getMembers = async (req = request, res = response) => {
  const query = { state: true };
  const members = await Member.find(query).populate("user", "name");
  const todos = await Member.countDocuments(query);

  res.status(200).json({
    todos,
    data: members,
  });
};

const postMembers = async (req = request, res = response) => {
  const { name, description, img, urlFb, urlLk } = req.body;

  const data = {
    name,
    description,
    img,
    urlFb,
    urlLk,
    user: req.user._id,
  };

  const member = new Member(data);
  await member.save();

  res.status(201).json({
    msg: "Miembro creado",
    member,
  });
};

const putMember = async (req = request, res = response) => {
  const newMember = req.body;
  const { id } = req.params;
  const member = await Member.findByIdAndUpdate(id, newMember, {
    new: true,
  });

  res.status(201).json({
    msg: "Miembro actualizado",
    member,
  });
};

const deleteMember = async (req = request, res = response) => {
  const { id } = req.params;
  const member = await Member.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json({
    msg: "Miembro borrado",
    member,
  });
};

module.exports = {
  getMembers,
  postMembers,
  putMember,
  deleteMember,
};
