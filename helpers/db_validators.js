const User = require("../models/user");


//verify email
const emailExists = async(email = "") =>{
  const mail = await User.findOne({email});
  if(mail){
    throw new Error(`El correo: ${email} ya esta registrado`);
  }
};


module.exports={
 emailExists
}