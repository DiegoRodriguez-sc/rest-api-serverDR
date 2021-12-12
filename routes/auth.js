const { Router } = require("express");
const { check } = require("express-validator");
const { login, register, revalidarTWJ } = require("../controllers/auth.controller");
const { validateData } = require("../middlewares/validateData");
const { validateJwt } = require("../middlewares/validateJwt");

const router = Router();

router.post("/login",[
  check("email","El correo es obligatorio").isEmail(),
  check("password","La contraseña es obligatoria").not().isEmpty(),
  validateData
],login);


router.post("/register",[
  check("name","El nombre es obligatorio").not().isEmpty(),
  check("email","El correo es obligatorio").isEmail(),
  check("password","La contraseña es obligatoria").not().isEmpty(),
  validateData
],register);

router.get("/renew",[
  validateJwt
],revalidarTWJ);

module.exports = router;
