const jwt = require("jsonwebtoken");

const protect = (roles = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

      req.user = decoded;

      if (roles.length > 0 && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({
            message: `Access denied: ${req.user.role} role not permitted`,
          });
      }

      next();
    } catch (err) {
      return res.status(401).json({ message: "Token is not valid" });
    }
  };
};

module.exports = protect;
