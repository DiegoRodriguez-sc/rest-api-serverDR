const { Router } = require("express");
const { check } = require("express-validator");

const { validateData } = require("../middlewares/validateData");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateRol } = require("../middlewares/validateRol");

const router = Router();
//public
// router.get("/", getActivities);
// router.get("/:id", getActivitiesID);

// //private admin
// router.post("/", [
//   validateJwt,
//   validateRol,
//   check("title","El título es obligatorio").not().isEmpty(),
//   validateData
// ], postActivities);

// router.put("/:id", [
//   validateJwt,
//   validateRol,
//   check("id","No es un ID válido").isMongoId(),
//   check("id").custom(idActivityExists),
//   validateData
// ], putActivities);

// router.delete("/:id", [
//   validateJwt,
//   validateRol,
//   check("id","No es un ID válido").isMongoId(),
//   check("id").custom(idActivityExists),
//   validateData
// ], deleteActivities);

module.exports = router;
