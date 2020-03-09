const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const config = require("config");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const userAction = require("../../controller/authCtrl");

//@route   GET api/auth
//@desc    Test routauth
//@access  Public
// router.get("/", auth, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     res.json(user);
//   } catch (error) {
//     console.log(err.message);
//     res.status(500).send("Server Error");
//   }
// });

//@route   Post api/auth
//@desc    Test route
//@access  Public
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "password is required").exists()
  ],
  userAction.loginUser
);

module.exports = router;
