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

function App() {
  
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/my-bus-pass" element={<BusPass />} />
        <Route path="/all-Buses" element={<AllBuses />} />
        <Route path="/admin_home" element={<AdminHome />} />
        <Route path="/admin_all_buses" element={<AdminAllBuses />} />
      </Routes>
    </Router>
    <ToastContainer
        position="top-center"
        autoClose={5000}
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