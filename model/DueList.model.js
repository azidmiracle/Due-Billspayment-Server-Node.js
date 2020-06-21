const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const txn=mongoose.Schema({
  date_paid:{
    type: Date,
        default: Date.now
  },
  amount:Number,
  currency:String,
  paid_by:String,
  mode_payment:String
})

const duleListSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type:String,
    required:true
  },
  bills_name: String,
  benefeciary_name: String,
  frequency: String,
  scheduled_day: Number,
  amount: Number,
  currency: String,
  txn: [txn],
});

module.exports = mongoose.model("duelists", duleListSchema);
