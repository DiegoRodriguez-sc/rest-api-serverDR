const { Router } = require("express");
const { check } = require("express-validator");
const { getOrganization, postOrganization, putOrganization, deleteOrganization } = require("../controllers/organization.controller");
const { idOrganizationExists } = require("../helpers/db_validators");

const { validateData } = require("../middlewares/validateData");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateRol } = require("../middlewares/validateRol");


const router = Router();
//public
router.get("/", getOrganization);

//private admin
router.post(
  "/",
  [
    validateJwt,
    validateRol,
    check("title", "El título es obligatorio").not().isEmpty(),
    check("msgWelcome", "msgWelcome es obligatorio").not().isEmpty(),
    check("description", "description es obligatorio").not().isEmpty(),
    check("address", "address es obligatorio").not().isEmpty(),
    check("phone", "phone es obligatorio").not().isEmpty(),
    check("logo", "logo es obligatorio").not().isEmpty(),
    check("facebookUrl", "facebookUrl es obligatorio").not().isEmpty(),
    check("linkedinUrl", "linkedinUrl es obligatorio").not().isEmpty(),
    validateData,
  ],
  postOrganization
);

router.put(
  "/:id",
  [
    validateJwt,
    validateRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idOrganizationExists),
    validateData,
  ],
  putOrganization
);

router.delete(
  "/:id",
  [
    validateJwt,
    validateRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idOrganizationExists),
    validateData,
  ],
  deleteOrganization
);

module.exports = router;
