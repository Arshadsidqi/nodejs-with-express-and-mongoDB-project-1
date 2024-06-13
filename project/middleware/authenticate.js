const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");
exports.authenticate = async (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "token required" });
  }
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.user = decode;
    console.log(decode);
    next();
  } catch (error) {
    res.status(501).json({ message: error.message });
  }
};
