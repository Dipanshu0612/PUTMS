const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const AllBusModel = require("./Models/allbuses.jsx");
const AllUsersModel = require("./Models/allusers.jsx");
const LoginModel = require("./Models/loginmodel.jsx");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(3001, (res) => {
  console.log("Listening on port 3001");
});

const url =
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster0.0j2tmr7.mongodb.net/users_db`;
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
  res.send(data);
});


app.post("/verify_user", async (req, res) => {
  const { user_id, password } = req.body;
  const ID=user_id
  const user = await LoginModel.findOne({ ID });

  
  if (user.Password == password){
    res.send({success:true,message:"Login Successful!"})
  }
  else{
    res.send({success:false , message:"Invalid Credentials!"})
  }

});

app.post("/verify_admin", async (req, res) => {
  // console.log("Hii")
  const { user_id, password } = req.body;
  
  if ( user_id == "admin" && password == "admin123"){
    res.send({success:true,message:"Login Successful!"})
  }
  else{
    res.send({success:false , message:"Invalid Credentials!"})
  }

});

app.post('/removeUser',async (req,res)=>{
  const {Mobile}=req.body;
  const data=await AllUsersModel.deleteOne({Mobile})
})

app.post('/removeBus',async (req,res)=>{
  const {bus_number}=req.body;
  const data=await AllUsersModel.deleteOne({bus_number})
})

app.post('/getUserInfo',async(req,res)=>{
  const { user_id } = req.body;
  let data = await AllUsersModel.findOne({"Enrollment":user_id})
  res.send(data);
})
app.post('/getBusInfo',async(req,res)=>{
  const {busArea} = req.body;
  let data = await AllBusModel.findOne({"Area":busArea});
  res.send(data);
})
