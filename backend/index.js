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
  const ID=user_id
  const user = await LoginModel.findOne({ ID });
  console.log("User found in database:", user);
  console.log(user.Password, password)
  
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
  console.log(
    "Received request for ADMIN:",
    user_id,
    "with password:",
    password
  );
  
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
  console.log(data)
})

app.post('/removeBus',async (req,res)=>{
  const {bus_number}=req.body;
  const data=await AllUsersModel.deleteOne({bus_number})
  console.log(data)
})


