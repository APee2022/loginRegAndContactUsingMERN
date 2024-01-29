const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  // req.header("Authorization") here our token is stored with Bearer prefix
  if (!token) {
    // If you attempt to use an expired token, you will receive a "401 Unauthorized HTTP"
    // response
    return res
      .status(401)
      .json({ message: "Unauthorized HTTP, Token not Provided" });
  }
  // Assuming token is in the format "Bearer" <jwtToken>, Removing the
  // "Bearer" prefix
  const jwtToken = token.replace("Bearer", "").trim();
  console.log("token from auth middleware", jwtToken);

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });
    // console.log(userData);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
