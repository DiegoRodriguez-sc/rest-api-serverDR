const { Router } = require("express");
const { check } = require("express-validator");

const {
  getCategories,
  getCategoriesID,
  postCategories,
  putCategories,
  deleteCategories,
} = require("../controllers/categories.controller");

const router = Router();

router.get("/", getCategories);

router.get("/:id", getCategoriesID);

router.post("/", postCategories);

router.put("/:id", putCategories);

router.delete("/:id", deleteCategories);

module.exports = router;
