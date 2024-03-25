const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const AllBusModel = require("./Models/allbuses.jsx");
const AllUsersModel = require("./Models/allusers.jsx");
const LoginModel = require("./Models/loginmodel.jsx");
// const AllUsersModel = require('./Models/allusers.jsx')

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(3001, (res) => {
  console.log("Listening on port 3001");
});

const url =
  "mongodb+srv://dipanshuamishra06:9Tna7xJAsdI6RPeB@cluster0.0j2tmr7.mongodb.net/users_db";
mongoose.connect(url).then(console.log("Connected to Database!"));

app.post("/payment", async (req, res) => {
  let instance = new Razorpay({
    key_id: "rzp_test_CXhrGKDYeZO527",
    key_secret: "htPOpiduZo4I48V4MQANKtYR",
  });
  let options = {
    amount: 22000 * 100,
    currency: "INR",
    line_items_total: 22000 * 100,
  };
  instance.orders.create(options, function (err, order) {
    if (err) {
      console.log(err);
    }
    res.json(order);
  });
});

app.get("/all-Buses", async (req, res) => {
  const data = await AllBusModel.find({});
  res.send(data);
});

app.get("/all-users", async (req, res) => {
  const data = await AllUsersModel.find({});
  console.log(data);
  res.send(data);
});

app.post("/verify_user", async (req, res) => {
  const { user_id, password } = req.body;
  console.log(
    "Received request for userID:",
    user_id,
    "with password:",
    password
  );

  const user = await LoginModel.findOne({ user_id });
  console.log("User found in database:", user);
  
});
