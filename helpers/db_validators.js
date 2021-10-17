const User = require("../models/user");


//verify email
const emailExists = async(email = "") =>{
  const mail = await User.findOne({email});
  if(mail){
    throw new Error(`El correo: ${email} ya esta registrado`);
  }
};

//verify id in bd
const idUserExists = async(id)=>{
  const idUser = await User.findById(id);
  if(!idUser){
    throw new Error(`El id: ${id} no existe`);
  }
};


module.exports={
 emailExists,
 idUserExists
}