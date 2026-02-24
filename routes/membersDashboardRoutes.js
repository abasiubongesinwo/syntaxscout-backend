const express = require("express");
const membersDashboardController = require("../controllers/membersController/members");
// Import the middleware you created in the middleware folder
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Now, only users with the role 'user' or 'admin' can access this route
// It also ensures they have a valid JWT token
router.get("/", protect(["user", "admin"]), membersDashboardController);

module.exports = router;
