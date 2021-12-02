const { request, response } = require("express");

const getCategories = (req = request, res = response) => {

  res.status(200).json({
    msg:"get categorias"
  })

};
const getCategoriesID = (req = request, res = response) => {

  const {id} = req.params;

  res.status(200).json({
    msg:"get categorias por id",
    id
  })

};
const postCategories = (req = request, res = response) => {

 const category = req.body;
  res.status(201).json({
    msg:"post categorias",
    category
  })

};
const putCategories = (req = request, res = response) => {

  const category = req.body;
  const {id} = req.params;

  res.status(201).json({
    msg:"put categorias",
    id,
    category
  })

};
const deleteCategories = (req = request, res = response) => {

  const {id} = req.params;

  res.status(200).json({
    msg:"delete categorias",
    id
  })

};


module.exports={
 getCategories,
 getCategoriesID,
 postCategories,
 putCategories,
 deleteCategories
}