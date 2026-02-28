const express = require("express");
const membersDashboardController = require("../controllers/membersController/members");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect(["user", "admin"]), membersDashboardController);

module.exports = router;
