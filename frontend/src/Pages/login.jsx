import React, { useState } from 'react'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from "react-toastify"
import PU from "../assests/PU.png"
import "../index.css"
import Spinner from '../components/Spinner'


export default function Login() {
  let navigate = useNavigate();
  const [user_id, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    setLoading(true); 
    try {
      const response = await axios.post('https://putms.onrender.com/verify_user', { user_id, password });
      if (response.data.success) {
        toast.success(response.data.message)
        sessionStorage.setItem("user_id", user_id);
        navigate('/home')
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <div className='flex justify-around h-screen w-full md:flex-col sm:flex-col'>

        <div className='w-1/2 md:w-full sm:w-full h-screen overflow-hidden busimg md:max-h-min sm:max-h-min'>
        </div>

        <div className='w-1/2 sm:w-full md:w-full bg-slate-100 flex items-center justify-center p-4 space-y-8 flex-col login md:space-y-5 sm:space-y-3 overflow-auto'>

          <div className='flex flex-col items-center justify-center md:mt-[6rem] sm:mt-20'>
            <img src={PU} alt="No" className='h-[5rem] md:h-[3rem] sm:h-[2rem]' />
            <h3 className='font-bold text-center text-4xl mt-4 md:text-2xl sm:text-xl'>Transport Management System</h3>
            <h3 className='tracking-wide md:text-xl sm:text-[1rem]'>User Login</h3>
          </div>

          <div className='flex flex-col w-[20rem] h-[15rem] space-y-5 bg-slate-200 rounded-3xl items-center justify-center md:space-y-3 sm:space-y-2 p-2'>
            <input type="email" placeholder='User Id' className='bg-slate-100 rounded-lg w-[80%] p-2' value={user_id} onChange={(e) => setUserID(e.target.value)} required />
            <input type="password" placeholder='Password' className='bg-slate-100 rounded-lg w-[80%] p-2' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button className='bg-green-500 py-2 px-3 rounded-lg hover:bg-green-600 ease-in-out transition' onClick={() => {
              handleLogin()
            }}>Submit</button>
            <h6 className='text-center font-medium'><Link to="/forgot-password" className="text-black no-underline hover:!text-blue-500 hover:!underline">Forgot Password ?</Link></h6>
          </div>

          <div>
            <button className='bg-green-500 py-2 px-3 my-2 mx-2 rounded-lg hover:bg-green-600 ease-in-out transition '><Link to="/admin-login" className="text-black no-underline hover:text-white">Admin Login</Link></button>

          </div>

        </div>

      </div>
    </>
  )

}
