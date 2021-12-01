const { response } = require("express");


const validateRol = (req, res = response) => {

 if(!req.user){
   return res.status(500).json({
     msg:"Se quiere verificar el role sin validar el token primero"
   });
 }

 const {rol, name} = req.user;
 if(rol !== "ADMIN_ROLE"){
    return res.status(401).json({
      msg:`${name} no es admin `
    });
 }
}

module.exports={
  validateRol
}