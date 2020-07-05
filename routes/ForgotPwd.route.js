require('dotenv').config()

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const waterfall = require("async-waterfall");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const crypto = require("crypto");
const elasticemail = require("elasticemail");
const User = require("../model/Users.model");

router.post("/:email", async (req, res, next) => {
  try {
    //generate code
    const buf = crypto.randomBytes(3);

    const updateToken = await User.updateOne(
      { email: req.params.email },
      {
        $set: {
          resetPasswordToken: buf.toString("hex"),
          resetPasswordExpires: Date.now() + 3600000,
        },
      }
    );

     
    var client = elasticemail.createClient({
      username: "emsky",
      apiKey:
      process.env.SMTP_API_KEY,
    });

    var msg = {
      from: process.env.EMAIL_FROM,
      from_name: "Bills Payment",
      to: req.params.email,
      subject: "Bills Payment App Password Reset",
      body: `Please copy this code < ${buf.toString("hex")} > to the mobile app.`,
    };

    client.mailer.send(msg, function (err, result) {
      if (err) {
        return console.error(err);
      }

      res.json(
        process.env.EMAIL_FROM
      );
    });
  } catch (err) {
    res.json(err);
  }
});

router.get("/:email/:code", async (req, res, next) => {
  try {
    //const user = await User.findOne({username:req.params.username,password:req.params.password},{password:0,name:0,image:0})
 
    const user = await User.findOne(
      { email: req.params.email, resetPasswordToken: req.params.code },
      {
        _id: 0,
        password: 0,
        username: 0,
        name: 0,
        image: 0,
        resetPasswordToken: 0,
        resetPasswordExpires:0
      }
    );
    res.json(user.email);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
