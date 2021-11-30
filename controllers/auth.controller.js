const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const login = async(req = request, res = response) => {

  const {email, password} = req.body;

  try {
    
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({
         msg:"Usuario/contraseña incorrectos"
      });
    }

    if(user.state === false ){
      return res.status(400).json({
         msg:"Usuario/contraseña incorrectos"
      })
    }
  
    const validPassword = bcryptjs.compareSync(password, user.password);
    if(!validPassword){
      return res.status(400).json({
        msg:"Usuario/contraseña incorrectos"
      });
    }
    
    res.status(200).json({
      msg:"login ok"
    })



  } catch (error) {
    console.log(error);
    return res.status(500).json({
       msg:"Hable con el administrador"
    }) 
  }

}


module.exports ={
 login
}