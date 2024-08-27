const express = require('express');
const router = express.Router();

const {
  removeUser,
  removeBus,
  pushNotification,
  deleteNotification,
  getFeedback,
  addNewUser,
  addNewBus,
  getNotifications,
  verifyAdmin,
  getAllBuses,
  getAllUsers,
  showTransactions
} = require('../controllers/adminController');

router.post('/verify_admin', verifyAdmin);
router.post('/add_new_user', addNewUser);
router.post('/add_new_bus', addNewBus);
router.post('/remove_user', removeUser);
router.post('/remove_bus', removeBus);
router.post('/push_notification', pushNotification);
router.get('/get_feedback', getFeedback);
router.get('/get_notifications', getNotifications);
router.post('/delete_notification', deleteNotification);
router.get('/get_all_buses', getAllBuses);
router.get('/get_all_users', getAllUsers);
router.get('/show_transactions', showTransactions);


module.exports = router;
