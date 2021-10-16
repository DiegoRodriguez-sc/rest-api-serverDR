const { request, response } = require("express");


const getUsers = (req = request, res = response) =>{

  res.json({
   msg:"get users"
  })

};

const postUser = (req = request, res = response) =>{

 res.json({
  msg:"post user"
 })

};

const putUser = (req = request, res = response) =>{

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