const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const router = express.Router();
const UserAction = require("../../controller/userCtrl");
//@route   Post api/users
//@desc    Register user
//@access  Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more character"
    ).isLength({ min: 6 })
  ],
  UserAction.registerUser
);

module.exports = router;
