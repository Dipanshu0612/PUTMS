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
  
  const handleLogin = async (e) => {
    try {
      const response = await axios.post('http://localhost:3001/verify_user', { user_id, password });
      if (response.data.success){
        toast.success(response.data.message)
        navigate('/home')
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  };

return (
    <>
    
    <div className='flex justify-around h-screen w-full'>

    <div className='w-1/2 min-h-fit overflow-hidden'>
  <div className='flex flex-col m-[4rem]'>
    <img src={PU} alt="No"/>
    <h3 className='font-bold text-center text-4xl mt-4'>Transport Management System</h3>
    <img src={Bus} alt="No" className='h-[30rem]'/>
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
          <button className='bg-green-500 py-2 px-[0.15rem] mt-4 mx-5 rounded-lg hover:bg-green-700 ease-in-out transition' onClick={()=>{
            handleLogin()
          }}>Submit</button>
        </div>

        <div>
          <button className='bg-green-500 py-2 px-2 my-2 mx-2 rounded-lg hover:bg-green-700 ease-in-out transition '><Link to="/admin-login" className="text-black no-underline hover:text-white">Admin Login</Link></button>
          <button className='bg-blue-500 py-2 px-2 my-2 mx-2 rounded-lg hover:bg-blue-800 ease-in-out transition '><Link to="/forgot-password" className="text-black no-underline hover:text-white">Forgot Password</Link></button>

        </div>

      </div>
      
    </div>
    </>
  )

}
