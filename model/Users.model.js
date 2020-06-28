const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type:String,
    required:true
  },
  password: String,
  name:String,
  image:{
    type:String,
    default:"https://diazloria.com/duelists/avatar.jpg"
  }
});

module.exports = mongoose.model("users", usersSchema);
