const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const AllUsersModel = require("./Models/allusers.jsx");
const AllBusModel = require("./Models/allbuses.jsx");
const LoginModel = require("./Models/loginmodel.jsx");
const NotificationModel = require("./Models/notification.jsx");
const bycrypt = require("bcrypt");
const FeebackModel = require("./Models/feedback.jsx");


app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.listen(3001, (res) => {
  console.log("Listening on port 3001");
});

const url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASS}@cluster0.0j2tmr7.mongodb.net/users_db`;
mongoose.connect(url).then(console.log("Connected to Database!"));

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

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
  try {
    let { user_id, password } = req.body;
  const ID = user_id;
  const user = await LoginModel.findOne({ ID });
  if (!user) {
    res.send({ success: false, message: "User Does Not Exists!" });
  }
  password = password.toString();
  const ValidPass = await bycrypt.compare(password, user.Password);
  // console.log(ValidPass, typeof(user.Password), typeof(password))
  if (user && ValidPass) {
    res.send({ success: true, message: "Login Successful!" });
  } else {
    res.send({ success: false, message: "Invalid Password!" });
  }
  } catch (error) {
    res.send({ success: false, message: "Invalid Credentials!" });
    console.log(error);
  }
});



app.post("/verify_admin", async (req, res) => {
  // console.log("Hii")
  const { user_id, password } = req.body;

  if (user_id == "admin" && password == "admin123") {
    res.send({ success: true, message: "Login Successful!" });
  } else {
    res.send({ success: false, message: "Invalid Credentials!" });
  }
});

app.post("/removeUser", async (req, res) => {
  const { Mobile } = req.body;
  const data = await AllUsersModel.deleteOne({ Mobile });
});

app.post("/removeBus", async (req, res) => {
  const { bus_number } = req.body;
  console.log(bus_number);
  const data = await AllBusModel.deleteOne({ Bus_Number:bus_number });
  if (data) {
    console.log(data);
    res.send({ success: true, message: "Bus Deleted Successfully!" });
  } else {
    res.send({ success: false, message: "Failed to Delete Bus!" });
  }
});

app.post("/getUserInfo", async (req, res) => {
  try {
    const { user_id } = req.body;
    let data;
    if(user_id.length >5){
      data = await AllUsersModel.findOne({ Enrollment: user_id });
    }
    else{
      data = await AllUsersModel.findOne({ MIS_ID: user_id });
    }
    res.send(data);
  } catch (error) {
    console.error("Error getting user info:", error);
  }
});
app.post("/getBusInfo", async (req, res) => {
  const { busArea } = req.body;
  let data = await AllBusModel.findOne({ Area: busArea });
  res.send(data);
});
app.post("/forgot_pass", async (req, res) => {
  try {
    const { user_id } = req.body;
    let user = await AllUsersModel.findOne({ Enrollment: user_id });
    if (!user) {
      user = await AllUsersModel.findOne({ MIS_ID: user_id });
    }
    if (!user) {
      res.json({ success: false, message: "User Not Found!" });
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "dipanshu.a.mishra06@gmail.com",
        pass: "xybatwjbiiossxlv",
      },
    });

    const otp = Math.floor(Math.random() * 10000);

    const mailOptions = {
      from: "dipanshu.a.mishra06@gmail.com",
      to: "dipanshu.a.mishra06@gmail.com",
      subject: "Forgot Password OTP for PUTMS",
      text: `Dear ${user.Name},\n\nYour OTP for the PUTMS Password Reset is:\n\n${otp}\n\nThe OTP is valid only for 5 minutes.\n\nThank You for using PUTMS!`,
    };

    await transporter.sendMail(mailOptions);

    let otpreg = await LoginModel.updateOne(
      { ID: user_id },
      { $set: { otp: otp.toString() } }
    );
    console.log(otpreg);

    res.json({ success: true, message: "OTP Sent Successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.json({ success: false, message: "Failed to Send OTP!!" });
  }
});
app.post("/change_pass", async (req, res) => {
  try {
    const { user_id, newPass } = req.body;
    const hashedpass = await bycrypt.hash(newPass, 10);
    const user = await LoginModel.findOne({ ID: user_id });
    if (!user) {
      res.json({ success: false, message: "User Not Found!" });
    }
    let result = await LoginModel.updateOne(
      { ID: user_id },
      { $set: { Password: hashedpass } }
    );
    if (result) {
      res.json({ success: true, message: "Password Changed Successfully" });
    } else {
      res.json({ success: false, message: "Failed to Change Password" });
    }
  } catch (error) {
    console.error("Error changing password:", error);
    res.json({ success: false, message: "Failed to Change Password" });
  }
});
app.post("/verify_otp", async (req, res) => {
  try {
    const { user_id, otp } = req.body;

    const user = await LoginModel.findOne({ ID: user_id });

    if (!user || user.otp !== otp) {
      console.log(user, otp, user.otp);
      res.json({ success: false, message: "Invalid OTP" });
    } else {
      res.send({ success: true, message: "OTP Verification Successful" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
  }
});
app.post("/addNewUser", async (req, res) => {
  try {
    let {Name,Designation,Enrollment,Department,Mobile,Area,Shift,Institute} = req.body;
    let Card_ID=Mobile.toString().slice(0,5) + " (" + Mobile.toString().slice(5,10) + ")";
    let Bus_Pass_No="23/S/"+Enrollment.toString().slice(0,4)+"/"+Mobile.toString().slice(4,7);
    Shift=Shift.toString().slice(10,Shift.length);
    let newUser;
    if(Designation=="Student"){
      newUser = {Name, Designation, Enrollment, Department, Mobile, Institute, Card_ID, Bus_Pass_No, Area, Shift,img_url:""};
    }
    else{
      let MIS_ID=Enrollment;
      newUser = {Name, Designation, MIS_ID, Department, Mobile, Institute, Card_ID,Bus_Pass_No, Area, Shift,img_url:""};
    }
    let response = await AllUsersModel.create(newUser);
    let response2=await LoginModel.create({ID:Enrollment, Password:"12345678", otp:""});
    if(response && response2){
      res.json({ success: true, message: "Success" });
    }
    else{
      res.json({ success: false, message: "Failed" });
    }

  } catch (error) {
    console.error("Error adding new user:", error);
    res.json({ success: false, message: "Failed to Add New User!" });
  }
});
app.post("/addNewBus", async (req, res) => {
  try {
    let { Bus_Number, Driver_Name, Driver_Contact, Area, Start_Point, End_Point } = req.body;
    let newBus = { Bus_Number, Driver_Name, Driver_Contact, Area, Start_Point, End_Point };
    console.log(newBus);
    let response = await AllBusModel.create(newBus);
    if(response){
      res.json({ success: true, message: "Success" });
    }
    else{
      res.json({ success: false, message: "Failed" });
    }

  } catch (error) {
    console.error("Error adding new bus!:", error);
    res.json({ success: false, message: "Failed to Add New Bus!" });
  }
});
app.post("/push_notification", async (req, res) => {
  try {
    const { title, message } = req.body;
    let data = await NotificationModel.create({ title, message });
    console.log(data);
    if (data) {
      res.json({ success: true, message: "Notification Sent Successfully!" });
    } else {
      res.json({ success: false, message: "Failed to Send Notification!" });
    }
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
});
app.get("/get_notifications", async (req, res) => {
  try {
    let data = await NotificationModel.find({});
    res.send(data);
  } catch (error) {
    console.error("Error getting notifications:", error);
  }
});
app.post("/delete_notification", async (req, res) => {
  try {
    const { title } = req.body;
    let data = await NotificationModel.deleteOne({ title });
    if (data) {
      res.json({ success: true, message: "Notification Deleted Successfully!" });
    } else {
      res.json({ success: false, message: "Failed to Delete Notification!" });
    }
  } catch (error) {
    console.error("Error deleting notification:", error);
  }
});
app.post("/post_feedback", async (req, res) => {
  try {
    const { user_id, title, Feedback } = req.body;
    let NameData = await AllUsersModel.findOne({ Enrollment: user_id });
    if(!NameData){
      NameData = await AllUsersModel.findOne({ MIS_ID: user_id });
    }
    let Name=NameData.Name;
    let data = await FeebackModel.create({ ID:user_id, Name, Title: title, Feedback });
    if (data) {
      res.json({ success: true, message: "Feedback Sent Successfully!" });
    } else {
      res.json({ success: false, message: "Failed to Send Feedback!" });
    }
  } catch (error) {
    console.error("Error posting feedback:", error);
  }
});
app.get("/get_feedback", async (req, res) => {
  try {
    let data = await FeebackModel.find({});
    res.send(data);
  } catch (error) {
    console.error("Error getting feedback:", error);
  }
});
    