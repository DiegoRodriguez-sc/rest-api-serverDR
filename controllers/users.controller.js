const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const User = require("../models/user");



// methods

const getUsers = (req = request, res = response) =>{

  res.json({
   msg:"get users"
  })

};

const postUser = async(req = request, res = response) =>{

  const {name, email, password} =   req.body;
  const user = new User({name, email, password});
  
  //encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  // save DB
  await user.save();
 res.json({
  msg:"usuario creado",
  user
 })

};

const putUser = async(req = request, res = response) =>{

    const {id} = req.params;
    const {password, google, ...rest} = req.body;

    if(password){
      // password encrypted
      const salt = bcryptjs.genSaltSync();
      rest.password = bcryptjs.hashSync(password, salt);
    }
    const user = await User.findByIdAndUpdate(id, rest);
 res.json({
  msg:"put user"
 })

};

const deleteUser = (req = request, res = response) =>{

 res.json({
  msg:"delete user"
 })

};


module.exports={
 getUsers,
 postUser,
 putUser,
 deleteUser
}