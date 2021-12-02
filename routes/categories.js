const { Router } = require("express");
const { check } = require("express-validator");

const {
  getCategories,
  getCategoriesID,
  postCategories,
  putCategories,
  deleteCategories,
} = require("../controllers/categories.controller");
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

router.put("/:id", putCategories);

router.delete("/:id", deleteCategories);

module.exports = router;
