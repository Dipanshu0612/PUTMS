import React, { useState } from 'react'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify"
import PU from "../assests/PU.png"
import "../index.css"


export default function Login() {
  let navigate = useNavigate();
  let [a, setA] = useState(0);
  const [user_id, setUserID] = useState();
  let [newPass, setNewPass] = useState('');
  let [confirmPass, setConfirmPass] = useState('');
  let [showNewPass, setShowNewPass] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  let [otp, setOtp] = useState('');
  const inputStyle = {
    backgroundColor: isDisabled ? '#f2f2f2' : 'white',
    color: isDisabled ? '#888' : 'black',
    cursor: isDisabled ? 'not-allowed' : 'auto',
  };
  async function submit() {
    let response = await axios.post('https://putms.onrender.com/forgot_pass', { user_id });
    if (response.data.success) {
      setA((a) => 1 - a)
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }

  async function verifyOTP() {
    let response = await axios.post('https://putms.onrender.com/verify_otp', { user_id, otp });
    if (response.data.success) {
      setIsDisabled(true);
      setShowNewPass(true);
      toast.success(response.data.message);
    }
    else {
      toast.error(response.data.message);
    }
  }

  async function handleChangePass() {
    if (newPass !== confirmPass) {
      toast.error("Passwords do not match");
      return;
    }
    let response = await axios.post('https://putms.onrender.com/change_pass', { user_id, newPass });
    if (response.data.success) {
      toast.success(response.data.message);
      navigate('/');
    }
    else {
      toast.error(response.data.message);
    }
  }

  return (
    <>

      <div className='flex justify-around h-screen w-full fpbg'>

        <div className='w-1/2 min-h-fit overflow-hidden '>
          <div className='flex flex-col m-[4rem]'>
            <img src={PU} alt="No" />
            <h3 className='font-bold text-center text-4xl mt-4'>Transport Management System</h3>
            <img src="https://www.shutterstock.com/image-vector/illustration-yellow-school-bus-flat-600nw-2246845245.jpg" alt="No" className='h-[25rem]' />
          </div>
        </div>

        <div className='w-1/2 h-full bg-slate-100 flex items-center justify-center flex-col space-y-8'>

          <div className='flex flex-col items-center justify-center'>
            <h1>Welcome to PUTMS</h1>
            <h3>Forgot Password</h3>
          </div>

          <div className='flex flex-col w-50 space-y-4 py-4 px-6 bg-slate-200 rounded-3xl shadow-2xl'>
            <input type="text" placeholder='User ID' className='bg-slate-100 rounded-sm px-2 py-1 ' value={user_id} onChange={(e) => setUserID(e.target.value)} required disabled={isDisabled} style={inputStyle} />
            {a === 1 ? <><input type="password" placeholder='Enter OTP' className='bg-slate-100 rounded-sm px-2 py-1 ' onChange={(e) => {
              setOtp(e.target.value)
            }} autoFocus="true" />
              <button className='bg-green-500 py-2 px-[0.15rem] mt-4 mx-5 rounded-lg hover:bg-green-700' onClick={verifyOTP} hidden={showNewPass}>Submit</button> </> : <button className='bg-green-500 py-2 px-[0.15rem] mt-4 mx-5 rounded-lg hover:bg-green-700' onClick={() => {
                submit();
                setIsDisabled(true);
              }}>Send OTP</button>}
            {showNewPass && <><input type="password" placeholder='New Password' className='bg-slate-100 rounded-sm px-2 py-1 ' onChange={(e) => {
              setNewPass(e.target.value);
            }} autoFocus="true" />
              <input type="password" placeholder='Confirm Password' className='bg-slate-100 rounded-sm px-2 py-1' onChange={(e) => { setConfirmPass(e.target.value) }} />
              <button className='bg-green-500 py-2 px-[0.15rem] mt-4 mx-5 rounded-lg hover:bg-green-700' onClick={handleChangePass}>Change Password</button></>}
          </div>
          <button className='bg-green-500 py-2 px-[0.5rem] mt-4 mx-5 rounded-lg hover:bg-green-700'><Link to="/" className="decoration-none text-black">User Login</Link></button>

        </div>

      </div>
    </>
  )

}
