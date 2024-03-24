import React, { useState } from 'react'
import MainCarousel from '../components/carousel'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {toast} from "react-toastify"
import PU from "../assests/PU.png"
import Bus from "../assests/Bus.jpg"



export default function Login(){
  let navigate=useNavigate();
  const [user_id, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  let [a,setA]=useState(0);
  function submit(){
    setA((a)=>1-a)
  }
  
  const handleLogin = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.post('https://cpc-canteen-management-system.onrender.com/send_email', { user_id, password });
      toast.success(response.data.message)
      // console.log(response.data)
    } catch (error) {
      // console.log(error)
      toast.error(error)
    }
  };
  // console.log(user_id +" "+ password)

  const handleOTPVerification = async (e) => {
    try {
      const response = await axios.post('https://cpc-canteen-management-system.onrender.com/verify_otp', { user_id, otp });
      if(response.data.success){
        toast.success(response.data.message)
        navigate('/')
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.success(error)
    }
  };

return (
    <>
    
    <div className='flex justify-around h-screen w-full'>

    <div className='w-1/2 min-h-fit overflow-hidden'>
  <div className='flex flex-col m-[4rem]'>
    <img src={PU} alt="No"/>
    <img src={Bus} alt="No" className='h-[28rem]'/>
    <h3 className='font-bold text-center text-4xl'>Transport Management System</h3>
  </div>
</div>

      <div className='w-1/2 h-full bg-slate-100 flex items-center justify-center flex-col space-y-8'>

        <div className='flex flex-col items-center justify-center'>
          <h1>Welcome to PUTMS</h1>
          <h3>User Login</h3>
        </div>

        <div className='flex flex-col w-50 space-y-5 py-5 px-6 bg-slate-200 rounded-3xl'> 
          <input type="email" placeholder='User Id' className='bg-slate-100 rounded-sm px-2 py-1' value={user_id} onChange={(e) => setUserID(e.target.value)} required />
          <input type="password" placeholder='Password' className='bg-slate-100 rounded-sm px-2 py-1' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          {a===1?<input type="password" placeholder='Enter OTP' className='bg-slate-100 rounded-sm px-2 py-1 ' value={otp} onChange={(e)=> setOtp(e.target.value)} />:""}
          {a===1?
          <button className='bg-green-500 py-2 px-[0.15rem] mt-4 mx-5 rounded-lg' onClick={handleOTPVerification}>Login</button> : <button className='bg-green-500 py-2 px-[0.15rem] mt-4 mx-5 rounded-lg' onClick={()=>{
            handleLogin()
            submit()
          }}>Submit</button>}
        </div>

        <div>
          <button className='bg-green-500 py-2 px-2 my-2 mx-2 rounded-lg'><Link to="/admin-login" className="text-black no-underline">Admin Login</Link></button>
          <button className='bg-blue-500 py-2 px-2 my-2 mx-2 rounded-lg'><Link to="/forgot-password" className="text-black no-underline">Forgot Password</Link></button>

        </div>

      </div>
      
    </div>
    </>
  )

}
