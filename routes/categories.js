const { Router } = require("express");
const { check } = require("express-validator");

const {
  getCategories,
  getCategoriesID,
  postCategories,
  putCategories,
  deleteCategories,
} = require("../controllers/categories.controller");
const { idCategorieExists } = require("../helpers/db_validators");
const { validateData } = require("../middlewares/validateData");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateRol } = require("../middlewares/validateRol");

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategoriesID);

router.post("/", [
  validateJwt,
  validateRol,
  check("name","El nombre es obligatorio").not().isEmpty(),
  validateData
], postCategories);

router.put("/:id", [
  validateJwt,
  validateRol,
  check("id","No es un ID válido").isMongoId(),
  check("id").custom(idCategorieExists),
  validateData
], putCategories);

router.delete("/:id", [
  validateJwt,
  validateRol,
  validateData
], deleteCategories);

module.exports = router;
