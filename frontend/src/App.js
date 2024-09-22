import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Pages/home";
import Login from "./Pages/login";
import AdminLogin from "./Pages/admin_login";
import ForgotPasssword from "./Pages/forgot-passsword";
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import BusPass from "./Pages/buspass";
import AllBuses from "./Pages/allBuses";
import AdminHome from "./Pages/adminHome";
import AdminAllBuses from "./Pages/adminAllBuses";
import AdminAllUsers from "./Pages/adminAllUsers";
import ChangePassword from "./Pages/change_password";
import PushNotification from "./Pages/push_notification";
import Feedback from "./Pages/feedback";
import AdminFeedback from "./Pages/admin_feedback";
import AdminTransactions from "./Pages/adminTransactions";

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/my-bus-pass" element={<BusPass />} />
        <Route path="/all-buses" element={<AllBuses />} />
        <Route path="/send_feedback" element={<Feedback />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/admin_home" element={<AdminHome />} />
        <Route path="/all_users" element={<AdminAllUsers />} />
        <Route path="/all_buses" element={<AdminAllBuses />} />
        <Route path="/push_notification" element={<PushNotification />} />
        <Route path="/feedbacks" element={<AdminFeedback />} />
        <Route path="/transactions" element={<AdminTransactions />} />
      </Routes>
    </Router>
    <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
export default App;