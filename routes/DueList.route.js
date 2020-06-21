/*MODULE DESCRIPTION
THIS MODULE IS USED TO GET ALL THE DUES
*/
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const dueLists = require("../model/DueList.model");

//Aggregation function
router.get("/:user_id", async (req, res, next) => {
  //res.send("Getting data");
  try {
    
    let todayDate = new Date();//get the date today

    let prevMonth = new Date(todayDate.setMonth(todayDate.getMonth() - 12));//get the date previous 12 months

    const due = await dueLists.aggregate([
      {
        $match: {//FIRST STAGE: GET THE LISTS WHERE THE user_id equals to the logged user_id
          user_id: req.params.user_id,
        },
      },
      {
        $project: {//SECOND STAGE: project the necessary fiels
          user_id: 1,
          bills_name: 1,
          benefeciary_name: 1,
          frequency: 1,
          scheduled_day: 1,
          amount: 1,
          currency: 1,
          txn: [//filter the transaction where the txn.date_paid is equal or greater than the prevMonth variable
            {
              $filter: {
                input: "$txn",
                as: "txn",
                cond: {
                  $and: [
                    {
                      $gte: ["$$txn.date_paid", prevMonth],
                    },
                  ],
                },
              },
            },
          ],
        },
      },
      { $sort: { bills_name: 1 } },//THIRD STAGE: once projected, can sort the output by bills name
    ]);
    res.json(due);//return the value and pass it to the client side
  } catch (err) {
    res.json(err);
  }
});


// Create one due
router.post("/", async (req, res, next) => {

  const due = new dueLists({//INSERT THIS VALUE TO THE DUELIST COLLECTION
    _id: new mongoose.Types.ObjectId(),
    user_id: req.body.user_id,
    bills_name: req.body.bills_name,
    benefeciary_name: req.body.benefeciary_name,
    frequency: req.body.frequency,
    scheduled_day: req.body.scheduled_day,
    amount: req.body.amount,
    currency: req.body.currency,
    txn: req.body.txn,
  });
  try {
    const savedDue = await due.save();
    res.json(savedDue);
  } catch (err) {
    res.json(err);
  }
});

// Update one due
router.patch("/:id", async (req, res) => {
  try {
    const updatedDue = await dueLists.updateOne(
      { _id: req.params.id },
      {
        $set: {
          bills_name: req.body.bills_name,
          benefeciary_name: req.body.benefeciary_name,
          frequency: req.body.frequency,
          scheduled_day: req.body.scheduled_day,
          amount: req.body.amount,
          currency: req.body.currency,
        },
      }
    );
    res.json(updatedDue);
  } catch (err) {
    res.json(err);
  }
});

// Delete one due
router.delete("/:id", async (req, res) => {
  try {
    const removeDue = await dueLists.remove({
      _id: req.params.id,
    });
    res.json(removeDue);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
