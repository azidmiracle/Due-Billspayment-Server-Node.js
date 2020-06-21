/*MODULE DESCRIPTION:
THIS ROUTE IS USED TO INSERT NEW TRANSACTION UNDER HOME TAB
AND
GET THE PREVIOUS TRANSACTION TO DISPALY UNDER HISTORY TAB
*/

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const dueLists = require("../model/DueList.model");

/*
THIS PART IS GETTING ALL THE TRANSACTION
IN ORDER TO DISPLAY THE PREVIOUS TRANSACTIONS
*/
//Aggregation function
router.get("/:user_id", async (req, res, next) => {
  //res.send("Getting data");
  try {
    let todayDate = new Date(); //get the date today

    let prevMonth = new Date(todayDate.setMonth(todayDate.getMonth() - 12)); //get the date previous 12 months

    const due = await dueLists.aggregate([
      {
        $match: { user_id: req.params.user_id}
      },
      {
        $project: {//SECOND STAGE: project the necessary fiels
          user_id: 1,
          bills_name: 1,
          benefeciary_name: 1,
          txn: 1
        },
      },
      {
        $unwind: "$txn",
      },
      {
        $match: { "txn.date_paid": { $gte: new Date(prevMonth) } }
      },
      {
        $group: {
          //THIRD STAGE: once projected, can sort the output by bills name
          _id: { month: { $month: "$txn.date_paid"}, year: { $year: "$txn.date_paid" } },
          allTnxs: {
            $push: {
              bills_name: "$bills_name",
              benefeciary_name: "$benefeciary_name",
              txn: "$txn",
            },
          },
        },
    },{ $sort: { '_id': 1 } },//THIRD STAGE: once projected, can sort the output by date_paid
    ]);
    res.json(due); //return the value and pass it to the client side
  } catch (err) {
    res.json(err);
  }
});



module.exports = router;
