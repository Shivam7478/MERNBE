const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const auth = require("../../middleware/auth");
const List = require("../../models/List");
const userAction = require("../../controller/listCtrl");

//@route   GET api/list/pendinglist
//@desc    Get Current user list
//@access  Private
router.get("/pending", auth, userAction.getUserPendingList);

//@route   GET api/list/completedlist
//@desc    Get Current user list
//@access  Private
router.get("/completed", auth, userAction.getUserCompletedList);

//@route   POST api/list
//@desc    Create user list
//@access  Private
router.post(
  "/",
  [
    auth,
    [
      check("title", "title is required")
        .not()
        .isEmpty(),
      check("description", "description is reqired")
        .not()
        .isEmpty()
    ]
  ],
  userAction.createUserList
);

//@route   Put api/list
//@desc    Update user list
//@access  Private
router.put(
  "/update/:id",
  [
    auth,
    [
      check("title", "title is required")
        .not()
        .isEmpty(),
      check("description", "description is reqired")
        .not()
        .isEmpty()
    ]
  ],
  userAction.updateUserList
);

//@route   DELETE api/list
//@desc    Delete List of user
//@access  Private
router.delete("/:id", auth, userAction.deleteUserList);

//@route   DELETE api/list/completed
//@desc    Delete all completed List of user
//@access  Private
router.get("/deleteAllList", auth, userAction.deleteCompletedUserList);

module.exports = router;
