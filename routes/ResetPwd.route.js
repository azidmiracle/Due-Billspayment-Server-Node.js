const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../model/Users.model");

router.post("/", async (req, res, next) => {
  try {
    const hashedPwd = bcrypt.hashSync(req.body.password, saltRounds);
    const updateToken = await User.updateOne(
      { email: req.body.email },
      {
        $set: {
          password: hashedPwd,
          
        },
      }
    );

    res.json("update")

  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
