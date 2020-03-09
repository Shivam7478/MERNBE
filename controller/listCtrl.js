const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const Profile = require("../models/Profile");
const User = require("../models/User");
const auth = require("../middleware/auth");
const List = require("../models/List");

//@controller   getUserPendingList
//@desc get pending user list

exports.getUserPendingList = async (req, res) => {
  try {
    const list = await List.find({
      userID: req.user.id,
      status: "false"
    });
    if (!list) {
      return res.status(400).json({ msg: "there is no list for this user" });
    }
    res.json(list);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

//@controller   getUserCompletedList
//@desc get completed user list

exports.getUserCompletedList = async (req, res) => {
  try {
    const list = await List.find({
      userID: req.user.id,
      status: "true"
    });
    if (!list) {
      return res.status(400).json({ msg: "there is no list for this user" });
    }
    res.json(list);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

//@controller   createUserList
//@desc create user list
exports.createUserList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }
  const { title, description } = req.body;
  //Build list object
  const listFields = {};
  listFields.userID = req.user.id;
  if (title) listFields.title = title;
  if (description) listFields.description = description;

  try {
    //create
    list = new List(listFields);
    await list.save();
    res.json(list);
  } catch (error) {
    res.status(500).send("server error");
  }
};

//@controller   updateUserList
//@desc update user list

exports.updateUserList = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }
  const { title, description, status } = req.body;
  //Build list object
  const listFields = {};

  try {
    if (title) listFields.title = title;
    if (description) listFields.description = description;
    if (status) listFields.status = status;
    let list = await List.findOne({ _id: req.params.id });
    if (list) {
      //Update
      list = await List.findOneAndUpdate(
        { _id: req.params.id },
        { $set: listFields },
        { new: true }
      );
      return res.json(list);
    }
  } catch (error) {
    res.status(500).send("server error");
  }
};

// @controller   deleteUserList
// @desc delete user list

exports.deleteUserList = async (req, res) => {
  try {
    //@todo -  remove users posts
    //Remove profile
    await List.findOneAndRemove({
      _id: req.params.id
    });
    res.json({ msg: "List deleted" });
  } catch (error) {
    res.status(500).send("server error");
  }
};

// @controller   deleteCompletedUserList
// @desc delete user Completelist

exports.deleteCompletedUserList = async (req, res) => {
  try {
    await List.deleteMany({
      userID: req.user.id,
      status: true
    });
    res.json({ msg: "List deleted" });
  } catch (error) {
    res.status(500).send("server error");
    console.log(error);
  }
};
