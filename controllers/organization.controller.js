const { request, response } = require("express");
const Organization = require("../models/organization");

const getOrganization = async (req = request, res = response) => {
  const query = { state: true };
  const organization = await Organization.find(query).populate("user", "name");

  res.status(200).json({
    organization,
  });
};

const postOrganization = async (req = request, res = response) => {
  const {
    title,
    msgWelcome,
    description,
    address,
    phone,
    logo,
    facebookUrl,
    linkedinUrl,
  } = req.body;

  const data = {
    title,
    msgWelcome,
    description,
    address,
    phone,
    logo,
    facebookUrl,
    linkedinUrl,
    user: req.user._id,
  };

  const organization = new Organization(data);
  await organization.save();

  res.status(201).json({
    organization,
  });
};

const putOrganization = async (req = request, res = response) => {
  const newOrganization = req.body;
  const { id } = req.params;
  const organization = await Organization.findByIdAndUpdate(
    id,
    newOrganization,
    {
      new: true,
    }
  );

  res.status(201).json({
    msg: "Actualizada correctamente",
    organization,
  });
};

const deleteOrganization = async (req = request, res = response) => {
  const { id } = req.params;
  const organization = await Organization.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json({
    msg: "Borrada correctamente",
    organization,
  });
};

module.exports = {
  getOrganization,
  postOrganization,
  putOrganization,
  deleteOrganization,
};
