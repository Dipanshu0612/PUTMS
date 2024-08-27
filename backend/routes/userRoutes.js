const express = require('express');
const router = express.Router();

const {
  verifyUser,
  getAllBuses,
  getUserInfo,
  getBusInfo,
  forgotPassword,
  changePassword,
  verifyOtp,
  postFeedback,
  getNotifications,
  handlePayment
} = require('../controllers/user_controller');

router.post('/verify_user', verifyUser);
router.post('/get_user_info', getUserInfo);
router.get('/all_buses', getAllBuses);
router.post('/get_bus_info', getBusInfo);
router.post('/forgot_password', forgotPassword);
router.post('/change_password', changePassword);
router.post('/verify_otp', verifyOtp);
router.post('/post_feedback', postFeedback);
router.get('/get_notifications', getNotifications);
router.post('/payment', handlePayment);

module.exports = router;
