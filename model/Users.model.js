const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type:String,
    required:true,
    unique: true 
  },
  name:String,
  email: { type: String, required: true, unique: true },
  password: String,
  image:{
    type:String,
    default:"https://diazloria.com/duelists/avatar.jpg"
  },
  resetPasswordExpires: Date,
  resetPasswordToken: String
  
});

module.exports = mongoose.model("users", usersSchema);
