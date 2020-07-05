//require('dotenv').config()

const bodyParser = require("body-parser");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require('express-session')
const passport = require('passport');
const flash = require('express-flash');

const cors = require("cors");
//middleware
app.use(cors());

app.use(bodyParser.json());

mongoose.connect(
  process.env.DATABASE_URL,//this is the MongoDB URL
  { useNewUrlParser: true }
);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(express.json());

app.use(session({ secret: 'session secret key' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//--ROUTES --//
//THIS ROUTES SHOULD MATCH IN THE CLIENT SIDE (AXIOS)
const sampleRoute = require("./routes/DueList.route");
app.use("/", sampleRoute);

const dueListsRoute = require("./routes/DueList.route");
app.use("/dueLists", dueListsRoute);

const txnRoute = require("./routes/Transaction.route");
app.use("/dueLists/txn", txnRoute);

const historyRoute = require("./routes/History.route");
app.use("/history", historyRoute);

const usersRoute = require("./routes/Users.route");
app.use("/user", usersRoute);

const forgotPwdRoute = require("./routes/ForgotPwd.route");
app.use("/forgot", forgotPwdRoute);

const resetpwd = require("./routes/ResetPwd.route");
app.use("/reset", resetpwd);

const settingsRoute = require("./routes/UserSettings.route");
app.use("/settings", settingsRoute);

//end route




//WHATEVER PORT IS AVAILABLE OF PORT 5000
app.listen(process.env.PORT || 5000, () => console.log("server started"));
