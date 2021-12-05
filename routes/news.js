const { Router } = require("express");
const { check } = require("express-validator");
const {
  getNews,
  getNewsID,
  postNews,
  putNews,
  deleteNews,
} = require("../controllers/news.controller");
const { validateData } = require("../middlewares/validateData");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateRol } = require("../middlewares/validateRol");
const { idNewExists } = require("../helpers/db_validators");

const router = Router();
//public
router.get("/", getNews);
router.get("/:id", getNewsID);

//private admin
router.post(
  "/",
  [
    validateJwt,
    validateRol,
    check("title", "El título es obligatorio").not().isEmpty(),
    validateData,
  ],
  postNews
);

router.put(
  "/:id",
  [
    validateJwt,
    validateRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idNewExists),
    validateData,
  ],
  putNews
);

router.delete(
  "/:id",
  [
    validateJwt,
    validateRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idNewExists),
    validateData,
  ],
  deleteNews
);

module.exports = router;
