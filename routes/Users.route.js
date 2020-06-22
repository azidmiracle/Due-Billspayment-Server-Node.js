const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../model/Users.model");

// Get  user
router.get("/:username,:password", async (req, res, next) => {
  //res.send("Getting data");
    try{
        const user = await User.findOne({username:req.params.username,password:req.params.password},{password:0,name:0,image:0})
        res.json(user)
    }catch (err) {
        res.json(err);
      }
});

// Create one user
router.post("/", async (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.json(savedUser)
  } catch (err) {
    res.json(err);
  }
});

// Update one subscriber
router.patch("/:id", (req, res) => {});

// Delete one subscriber
router.delete("/:id", (req, res) => {});

module.exports = router;
