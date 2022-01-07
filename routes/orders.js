const { Router } = require("express");
const { check } = require("express-validator");
const { getOrders, postOrders, putOrders, deleteOrders } = require("../controllers/orders.controller");


const router = Router();

router.get("/", getOrders);
router.post("/", postOrders);
router.put("/:id", putOrders);
router.delete("/:id", deleteOrders);

module.exports = router;
