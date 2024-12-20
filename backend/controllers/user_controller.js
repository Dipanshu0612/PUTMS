const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const AllUsersModel = require('../models/allusers');
const AllBusModel = require('../models/allbuses');
const LoginModel = require('../models/loginmodel');
const FeebackModel = require('../models/feedback');
const NotificationModel = require('../models/notification');
const jwt = require("jsonwebtoken");



exports.verifyUser = async (req, res) => {
  try {
    let { user_id, password } = req.body;
    const ID = user_id;
    const user = await LoginModel.findOne({ ID });
    if (!user) {
      res.send({ success: false, message: "User Does Not Exists!" });
    }
    password = password.toString();
    const ValidPass = await bcrypt.compare(password, user.Password);
    if (user && ValidPass) {
      jwt.sign(
        { user },
        process.env.JWT_KEY,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log("An Error Occured: ", err);
          } else {
            res.cookie("authCookie", token, {
              httpOnly: true,
              sameSite: "None",
              maxAge: 3600000,
            });
            res.send({ success: true, message: "Login Successful!" });
          }
        }
      );
    } else {
      res.send({ success: false, message: "Invalid Password!" });
    }
  } catch (error) {
    res.send({ success: false, message: "Invalid Credentials!" });
    console.log(error);
  }
};

exports.getAllBuses = async (req, res) => {
  const data = await AllBusModel.find({});
  res.send(data);
};

exports.getUserInfo = async (req, res) => {
   try {
     const { user_id } = req.body;
     const token = req.cookies.authCookie;
     let data;
     if (!token) {
       return res
         .status(403)
         .json({ message: "No token provided", success: false });
     }
     if (user_id.length > 5) {
       data = await AllUsersModel.findOne({ Enrollment: user_id });
     } else {
       data = await AllUsersModel.findOne({ MIS_ID: user_id });
     }

     try {
       await jwt.verify(token, process.env.JWT_KEY);
     } catch (err) {
       return res.status(401).json({
         message:
           "Unauthorized, invalid or expired token. Please Log in Again!",
         success: false,
       });
     }
     res.status(200).json({ data, success: true });
   } catch (error) {
     console.error("Error getting user info:", error);
   }
};

exports.getBusInfo = async (req, res) => {
  const { busArea } = req.body;
  let data = await AllBusModel.findOne({ Area: busArea });
  res.send(data);
};

exports.forgotPassword = async (req, res) => {
  try {
     const { user_id } = req.body;
     const token = req.cookies.authCookie;
     if (!token) {
       return res.status(403).json({ message: "No token provided" });
     }
     try {
       await jwt.verify(token, process.env.JWT_KEY);
     } catch (err) {
       return res.status(401).json({
         message: "Unauthorized, invalid or expired token",
         success: false,
       });
     }
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
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const otp = Math.floor(Math.random() * 10000);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
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
};

exports.changePassword = async (req, res) => {
  try {
    const { user_id, newPass } = req.body;
    const hashedpass = await bcrypt.hash(newPass, 10);
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
};

exports.verifyOtp = async (req, res) => {
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
};

exports.postFeedback = async (req, res) => {
  try {
    const { user_id, title, Feedback } = req.body;
    let NameData = await AllUsersModel.findOne({ Enrollment: user_id });
    if (!NameData) {
      NameData = await AllUsersModel.findOne({ MIS_ID: user_id });
    }
    let Name = NameData.Name;
    let data = await FeebackModel.create({ ID: user_id, Name, Title: title, Feedback });
    if (data) {
      res.json({ success: true, message: "Feedback Sent Successfully!" });
    } else {
      res.json({ success: false, message: "Failed to Send Feedback!" });
    }
  } catch (error) {
    console.error("Error posting feedback:", error);
  }
};

exports.getNotifications = async (req, res) => {
  try {
    let data = await NotificationModel.find({});
    res.send(data);
  } catch (error) {
    console.error("Error getting notifications:", error);
  }
};

exports.handlePayment = async (req, res) => {
  try {
    let { response, user_id } = req.body;
    response = response.razorpay_payment_id;
    const user = await AllUsersModel.updateOne({ Enrollment: user_id }, { $set: { Bus_Fees_Paid: "Yes", transaction_id: response } });
    if (!user) {
      await AllUsersModel.updateOne({ MIS_ID: user_id }, { $set: { Bus_Fees_Paid: "Yes", transaction_id: response } });
    }
  } catch (error) {
    console.error("Error making payment:", error);
    res.json({ success: false, message: "Payment Failed!" });
  }
};