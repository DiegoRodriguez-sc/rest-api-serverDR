const { Router } = require("express");
const { check } = require("express-validator");
const {
  getContacts,
  postContact,
  deleteContact,
} = require("../controllers/contact.controller");
const { idContactExists } = require("../helpers/db_validators");

const { validateData } = require("../middlewares/validateData");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateRol } = require("../middlewares/validateRol");

const router = Router();
//private
router.get("/", [validateJwt, validateRol, validateData], getContacts);

//public
router.post(
  "/",
  [check("title", "El título es obligatorio").not().isEmpty(), validateData],
  postContact
);

router.delete(
  "/:id",
  [
    validateJwt,
    validateRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idContactExists),
    validateData,
  ],
  deleteContact
);

module.exports = router;
