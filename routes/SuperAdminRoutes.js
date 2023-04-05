// superadminRoutes.js

const express = require("express");
const router = express.Router();

const superAdminController = require("../controllers/SuperAdminController");

router.get("/", superAdminController.getAll);
router.get("/:id", superAdminController.getById);
router.post("/", superAdminController.create);
router.put("/:id", superAdminController.updateById);
router.delete("/:id", superAdminController.deleteById);

module.exports = router;
