const mongoose = require("mongoose");

const usersSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type:String,
    required:true
  },
  password: String,

});

module.exports = mongoose.model("users", usersSchema);
