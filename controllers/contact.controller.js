const { request, response } = require("express");
const Contact = require("../models/contact");

const getContacts = async (req = request, res = response) => {
  const query = { state: true };
  const contacts = await New.find(query);
  const todos = await New.countDocuments(query);

  res.status(200).json({
    todos,
    data: contacts,
  });
};

const postContact = async (req = request, res = response) => {
  const { email, asunto, msg } = req.body;

  const data = {
    email,
    asunto,
    msg,
  };

  const contacts = new Contact(data);
  await contacts.save();

  res.status(201).json({
    msg: "Contacto creado",
    contacts,
  });
};

const deleteContact = async (req = request, res = response) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(
    id,
    { state: false },
    { new: true }
  );

  res.status(200).json({
    msg: "Contacto borrado",
    news,
  });
};

module.exports = {
  getContacts,
  postContact,
  deleteContact,
};
