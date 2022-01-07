const { Router } = require("express");
const { check } = require("express-validator");
const {
  getProducts,
  getProductId,
  postProduct,
  putProduct,
  deleteProduct,
} = require("../controller/products.controller");
const { idProductExists } = require("../helpers/db_validators");

const { validateData } = require("../middlewares/validateData");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateRol } = require("../middlewares/validateRol");

const router = Router();

//  Obtener todas las categorias - publico
router.get("/", getProducts);

// Obtener una categoria por id - publico
router.get(
  "/:id",
  [
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(idProductExists),
    validateData,
  ],
  getProductId
);

// Crear categoria - privado - cualquier persona con un token válido
router.post(
  "/",
  [
    validateJwt,
    validateRol,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("category", "No es un id de Mongo").isMongoId(),
    validateData,
  ],
  postProduct
);

// Actualizar - privado - cualquiera con token válido
router.put(
  "/:id",
  [
    validateJwt,
    validateRol,
    check("category", "No es un id de Mongo").isMongoId(),
    check("id").custom(idProductExists),
    validateData,
  ],
  putProduct
);

// Borrar una categoria - Admin
router.delete(
  "/:id",
  [
    validateJwt,
    validateRol,
    check("id", "No es un id de Mongo válido").isMongoId(),
    check("id").custom(idProductExists),
    validateData,
  ],
  deleteProduct
);

module.exports = router;