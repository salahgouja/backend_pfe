// adminRoutes.js

const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/AdminController");

router.get("/", AdminController.getAll);
router.get("/:id", AdminController.getById);
router.post("/", AdminController.create);
router.put("/:id", AdminController.updateById);
router.delete("/:id", AdminController.deleteById);

module.exports = router;
