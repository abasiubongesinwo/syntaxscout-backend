const jwt = require("jsonwebtoken");

const protect = (roles = []) => {
  return (req, res, next) => {
    // 1. Get token from header (Format: Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
      // 2. Verify token using the same PRIVATE_KEY from your login
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

      // Attach the user data (id, email, role) to the request object
      req.user = decoded;

      // 3. Check if the user's role is in the allowed list
      // If roles array is empty, it means any logged-in user can enter
      if (roles.length > 0 && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({
            message: `Access denied: ${req.user.role} role not permitted`,
          });
      }

      next(); // Move to the controller
    } catch (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }
  };
};

module.exports = protect;
