const AllUsersModel = require('../models/allusers');
const AllBusModel = require('../models/allbuses');
const LoginModel = require('../models/loginmodel');
const NotificationModel = require('../models/notification');
const FeebackModel = require('../models/feedback');

exports.verifyAdmin = async (req, res) => {
  const { user_id, password } = req.body;
  if (user_id == "admin" && password == "admin123") {
    res.send({ success: true, message: "Login Successful!" });
  } else {
    res.send({ success: false, message: "Invalid Credentials!" });
  }
};

exports.removeUser = async (req, res) => {
  const { Mobile } = req.body;
  const data = await AllUsersModel.deleteOne({ Mobile });
};

exports.removeBus = async (req, res) => {
  const { bus_number } = req.body;
  console.log(bus_number);
  const data = await AllBusModel.deleteOne({ Bus_Number: bus_number });
  if (data) {
    console.log(data);
    res.send({ success: true, message: "Bus Deleted Successfully!" });
  } else {
    res.send({ success: false, message: "Failed to Delete Bus!" });
  }
};

exports.pushNotification = async (req, res) => {
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
};

exports.getFeedback = async (req, res) => {
  try {
    let data = await FeebackModel.find({});
    res.send(data);
  } catch (error) {
    console.error("Error getting feedback:", error);
  }
};

exports.deleteNotification = async (req, res) => {
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
};

exports.addNewUser = async (req, res) => {
  try {
    let { Name, Designation, Enrollment, Department, Mobile, Area, Shift, Institute } = req.body;
    let Card_ID = Mobile.toString().slice(0, 5) + " (" + Mobile.toString().slice(5, 10) + ")";
    let Bus_Pass_No = "23/S/" + Enrollment.toString().slice(0, 4) + "/" + Mobile.toString().slice(4, 7);
    Shift = Shift.toString().slice(10, Shift.length);
    let newUser;
    if (Designation == "Student") {
      newUser = { Name, Designation, Enrollment, Department, Mobile, Institute, Card_ID, Bus_Pass_No, Area, Shift, img_url: "" };
    } else {
      let MIS_ID = Enrollment;
      newUser = { Name, Designation, MIS_ID, Department, Mobile, Institute, Card_ID, Bus_Pass_No, Area, Shift, img_url: "" };
    }
    let response = await AllUsersModel.create(newUser);
    let response2 = await LoginModel.create({ ID: Enrollment, Password: "12345678", otp: "" });
    if (response && response2) {
      res.json({ success: true, message: "Success" });
    } else {
      res.json({ success: false, message: "Failed" });
    }
  } catch (error) {
    console.error("Error adding new user:", error);
    res.json({ success: false, message: "Failed to Add New User!" });
  }
};

exports.addNewBus = async (req, res) => {
  try {
    let { Bus_Number, Driver_Name, Driver_Contact, Area, Start_Point, End_Point } = req.body;
    let newBus = { Bus_Number, Driver_Name, Driver_Contact, Area, Start_Point, End_Point };
    console.log(newBus);
    let response = await AllBusModel.create(newBus);
    if (response) {
      res.json({ success: true, message: "Success" });
    } else {
      res.json({ success: false, message: "Failed" });
    }
  } catch (error) {
    console.error("Error adding new bus!:", error);
    res.json({ success: false, message: "Failed to Add New Bus!" });
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

exports.getAllBuses = async (req, res) => {
  try {
    const data = await AllBusModel.find({});
    res.send(data);
  } catch (error) {
    console.error("Error getting all buses:", error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const data = await AllUsersModel.find({});
    res.send(data);
  } catch (error) {
    console.error("Error getting all users:", error);
  }
};

exports.showTransactions = async (req, res) => {
  try {
    const data = await AllUsersModel.find({ Bus_Fees_Paid: "Yes" }, { Enrollment: 1, transaction_id: 1 });
    res.send(data);
  } catch (error) {
    console.error("Error showing transactions:", error);
  }
};
