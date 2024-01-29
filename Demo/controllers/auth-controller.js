const User = require("../models/user-model");

// register logic
const register = async (req, res, next) => {
  try {
    // here we destructuring our schema data
    const { username, email, phone, password } = req.body;

    // To check the email we provide is already exist or not
    const userExist = await User.findOne({ email: email });
    // if user already exist than we display this message
    if (userExist) {
      // return res.status(400).json({ msg: "email already exists" });
      const err = {
        status: 400,
        message: "email already exists",
      };
      next(err);
    } else {
      // else we created this new user
      const userCreated = await User.create({
        username,
        email,
        phone,
        password,
      });

      res.status(201).json({
        msg: "registration successful",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });

      // console.log(userCreated);
    }
  } catch (error) {
    // Handle validation errors
    if (error.name === "ValidationError") {
      const status = 400;
      const errors = Object.values(error.errors).map((err) => err.message)[0];
      console.log(errors);
      const message = errors;
      // return res.status(400).json({ success: false, errors });
      const err = {
        status,
        message,
      };
      next(err);
    } else {
      // res.status(500).json("internal server error");
      // console.error(error);

      next(error);
    }
  }
};

// login logic
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      // return res.status(400).json({ message: "Invalid Credentials" });
      const error = {
        status: 400,
        message: "Invalid Credentials",
      };
      next(error);
    } else {
      const user = await userExist.comparePassword(password);
      if (user) {
        res.status(200).json({
          msg: "Login Successful",
          token: await userExist.generateToken(),
          userId: userExist._id.toString(),
        });
      } else {
        // res.status(401).json({ message: "Invalid email or password" });
        const error = {
          status: 401,
          message: "Invalid email or password",
        };
        next(error);
      }
    }
  } catch (error) {
    // res.status(500).json("internal server error");
    // console.log(error);
    next(error);
  }
};

// to get user data and use this data in frontend- user logic
const user = async (req, res) => {
  try {
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(`error from the user route ${error}`);
  }
};
module.exports = { register, login, user };
