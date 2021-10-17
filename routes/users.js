const { Router } = require("express");
const { getUsers, postUser, putUser, deleteUser } = require("../controllers/users.controller");
const {check} = require("express-validator");
const { validateData } = require("../middlewares/validateData");
const { emailExists } = require("../helpers/db_validators");

const router = Router();

 router.get("/", getUsers);

 router.post("/",[
   check("name","El nombre es requerido").notEmpty(),
   check("email","El correo no es válido").isEmail(),
   check("email").custom(emailExists),
   check("password","La contraseña tiene que tener 5 caracteres como minimo").isLength({min:5}),
   validateData
 ] ,postUser);
 
 router.put("/:id", putUser);
 
 router.delete("/:id", deleteUser);

module.exports = router;