const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../model/Users.model");

// Get  user details
router.get("/:_id", async (req, res, next) => {
    try{
        const user = await User.findOne({_id:req.params._id})
        res.json(user)
    }catch (err) {
        res.json(err);
      }
});


module.exports = router;
