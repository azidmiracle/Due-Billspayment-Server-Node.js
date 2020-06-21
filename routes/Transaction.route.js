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
THIS PART IS USED TO ADD TRANSACTION.
TRANSACTION OBJECT IS UNDER THE DUE LIST COLLECTION.
THEREFORE DueList.model IS IMPORTED
*/
// Get specific transaction only. In order to be able to add transaction later
router.get("/:id", async (req, res, next) => {
  //res.send("Getting data");
  try {
    const due = await dueLists.find({ _id: req.params.id });
    res.json(due);
  } catch (err) {
    res.json(err);
  }
});

// Update one transaction
router.post("/:id", async (req, res) => {
  dueLists
    .update(
      { _id: req.params.id },
      {
        $push: { txn: req.body.txn },
      }
    )
    .then(function (record) {
      res.json(record);
    });
});

// Delete one transaction
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
