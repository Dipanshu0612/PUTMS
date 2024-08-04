import React, { useState } from 'react'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import PU from "../assests/PU.png"
import { toast } from 'react-toastify'
import axios from 'axios'
import "../index.css"

export default function AdminLogin() {
  const [user_id, setUserID] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      const response = await axios.post('https://putms.onrender.com/verify_admin', { user_id, password });
      if (response.data.success) {
        sessionStorage.setItem("user_id", user_id);
        navigate('/admin_home')
        toast.success(response.data.message)
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  };
  return (
    <>
      <div className='flex justify-around h-screen w-full'>

        <div className='w-1/2 min-h-fit overflow-hidden busimg'>
        </div>

        <div className='w-1/2 h-full bg-slate-100 flex items-center justify-center flex-col space-y-8'>


          <div className='flex flex-col items-center justify-center'>
            <img src={PU} alt="No" className='h-[5rem]' />
            <h3 className='font-bold text-center text-4xl mt-4'>Transport Management System</h3>
            <h3>Admin Login</h3>
          </div>

          <div className='flex flex-col w-[20rem] h-[15rem] space-y-5 bg-slate-200 rounded-3xl items-center justify-center'>
            <input type="email" placeholder='User Id' className='bg-slate-100 rounded-lg w-[80%] p-2' value={user_id} onChange={(e) => setUserID(e.target.value)} required />
            <input type="password" placeholder='Password' className='bg-slate-100 rounded-lg w-[80%] p-2' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className='bg-green-500 py-2 px-3 rounded-lg hover:bg-green-600 ease-in-out transition' onClick={() => {
              handleLogin()
            }}>Submit</button>
          </div>

          <div>
            <button className='bg-green-500 py-2 px-2 my-2 mx-2 rounded-lg hover:bg-green-700 ease-in-out transition'><Link to="/" className="text-black no-underline">User Login</Link></button>
          </div>

        </div>

      </div>
    </>
  )
}
