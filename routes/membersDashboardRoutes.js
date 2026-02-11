const express   = require("express");
const membersDashboardController = require("../controllers/membersController/members")

const router = express.Router();

router.get("/", membersDashboardController)

module.exports = router;