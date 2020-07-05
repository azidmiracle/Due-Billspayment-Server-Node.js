const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require("../model/Users.model");

// Get  user
router.get("/:username,:password", async (req, res, next) => {
  //res.send("Getting data");
    try{       
        //const user = await User.findOne({username:req.params.username,password:req.params.password},{password:0,name:0,image:0})
        const user = await User.findOne({username:req.params.username},{name:0,image:0,email:0,resetPasswordExpires:0,resetPasswordToken:0})
        const match = await bcrypt.compare(req.params.password, user.password);
        if(match){
          let newUser={
            _id:user._id,
            username:user.username,
          }
          res.json(newUser)
        }
        else{
          res.json(0)
        }
             
    }catch (err) {
        res.json(err);
      }
});

// check if user exists
router.get("/:username", async (req, res, next) => {
  //res.send("Getting data");
    try{
        const user = await User.findOne({username:req.params.username},{password:0,name:0,image:0})
        res.json(user)
    }catch (err) {
        res.json(err);
      }
});

// Create one user
router.post("/", async (req, res, next) => {
  const hashedPwd = bcrypt.hashSync(req.body.password, saltRounds);
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    username: req.body.username,
    email: req.body.email,
    password:hashedPwd, //req.body.password,
    name: req.body.name,
    
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
