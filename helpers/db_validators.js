const Activitie = require("../models/activitie");
const Categorie = require("../models/categorie");
const Contact = require("../models/contact");
const Member = require("../models/member");
const New = require("../models/new");
const Organization = require("../models/organization");
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

//verify activity id
const idActivityExists = async (id) => {
  const idActivity = await Activitie.findById(id);
  if (!idActivity) {
    throw new Error(`El id: ${id} no existe`);
  }
};

//verify new id
const idNewExists = async (id) => {
  const idNew = await New.findById(id);
  if (!idNew) {
    throw new Error(`El id: ${id} no existe`);
  }
};

//verify contact id
const idContactExists = async (id) => {
  const idContact = await Contact.findById(id);
  if (!idContact) {
    throw new Error(`El id: ${id} no existe`);
  }
};

//verify contact id
const idMemberExists = async (id) => {
  const idMember = await Member.findById(id);
  if (!idMember) {
    throw new Error(`El id: ${id} no existe`);
  }
};

const idOrganizationExists = async (id) => {
  const idOrganization = await Organization.findById(id);
  if (!idOrganization) {
    throw new Error(`El id: ${id} no existe`);
  }
};

module.exports = {
  emailExists,
  idUserExists,
  idCategorieExists,
  idActivityExists,
  idNewExists,
  idContactExists,
  idMemberExists,
  idOrganizationExists,
};
