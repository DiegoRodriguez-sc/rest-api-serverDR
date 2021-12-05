const Activitie = require("../models/activitie");
const Categorie = require("../models/categorie");
const User = require("../models/user");


//verify user email
const emailExists = async(email = "") =>{
  const mail = await User.findOne({email});
  if(mail){
    throw new Error(`El correo: ${email} ya esta registrado`);
  }
};

//verify user id in bd
const idUserExists = async(id)=>{
  const idUser = await User.findById(id);
  if(!idUser){
    throw new Error(`El id: ${id} no existe`);
  }
};

//verify category id 
const idCategorieExists = async(id)=>{
  const idCategorie = await Categorie.findById(id);
  if(!idCategorie){
    throw new Error(`El id: ${id} no existe`);
  }
};

//verify activity id 
const idActivityExists = async(id)=>{
  const idActivity = await Activitie.findById(id);
  if(!idActivity){
    throw new Error(`El id: ${id} no existe`);
  }
};


module.exports={
 emailExists,
 idUserExists,
 idCategorieExists,
 idActivityExists
}