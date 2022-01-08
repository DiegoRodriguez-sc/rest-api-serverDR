const { Router } = require("express");
const { check } = require("express-validator");
const { getOrders, postOrders, putOrders, deleteOrders } = require("../controllers/orders.controller");
const { validateData } = require("../middlewares/validateData");
const { validateJwt } = require("../middlewares/validateJwt");
const { validateRol } = require("../middlewares/validateRol");


const router = Router();

router.get("/", getOrders);
router.post("/",[
 validateJwt,
 validateRol,
 validateData
], postOrders);
router.put("/:id", putOrders);
router.delete("/:id", deleteOrders);

module.exports = router;
