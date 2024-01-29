const express = require("express");
const router = express.Router();

const authControllers = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
// router.route("/").get(authControllers.home);

// router.route("/new").get(authControllers.newPage);

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);

router.route("/user").get(authMiddleware, authControllers.user);
// we are creating a authMiddleware to check a user is logged in or not
// if a user is logged in then we allow user function to call, where we get all user data
// while creating authMiddleware we create an extra parameter named next (req, res, next).
// This next parameter help to call the next function (authControllers.user)
module.exports = router;
