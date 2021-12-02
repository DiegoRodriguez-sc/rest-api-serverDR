const { Router } = require("express");
const { check } = require("express-validator");

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/users.controller");
const { validateData } = require("../middlewares/validateData");
const { emailExists, idUserExists } = require("../helpers/db_validators");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateRol } = require("../middlewares/validateRol");

const router = Router();

//public
router.get("/", getUsers);


//private
router.post(
  "/",
  [
    validateJwt,
    validateRol,
    check("name", "El nombre es requerido").notEmpty(),
    check("email", "El correo no es válido").isEmail(),
    check("email").custom(emailExists),
    check(
      "password",
      "La contraseña tiene que tener 5 caracteres como minimo"
    ).isLength({ min: 5 }),
    check("rol","No es un rol válido").isIn("ADMIN_ROL","USER_ROLE"),
    validateData,
  ],
  postUser
);

router.put(
  "/:id",
  [
    validateJwt,
    validateRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idUserExists),
    validateData,
  ],
  putUser
);

router.delete(
  "/:id",
  [
    validateJwt,
    validateRol,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(idUserExists),
    validateData,
  ],
  deleteUser
);

module.exports = router;
