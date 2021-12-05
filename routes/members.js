const { Router } = require("express");
const { check } = require("express-validator");
const { getMembers, postMembers, putMember, deleteMember } = require("../controllers/members.controller");
const { idMemberExists } = require("../helpers/db_validators");

const { validateData } = require("../middlewares/validateData");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateRol } = require("../middlewares/validateRol");


const router = Router();
//public
router.get("/", getMembers);

//private admin
router.post(
  "/",
  [
    validateJwt,
    validateRol,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    validateData,
  ],
  postMembers
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
  putMember
);

router.delete(
  "/:id",
  [
    validateJwt,
    validateRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idMemberExists),
    validateData,
  ],
  deleteMember
);

module.exports = router;
