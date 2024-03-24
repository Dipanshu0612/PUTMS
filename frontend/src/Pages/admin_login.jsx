import React from 'react'
import MainCarousel from '../components/carousel'
import { NavLink as Link } from 'react-router-dom'
import PU from "../assests/PU.png"
import Bus from "../assests/Bus.jpg"

export default function AdminLogin(){
return (
    <>
   <div className='flex justify-around h-screen w-full'>

<div className='w-1/2 min-h-fit overflow-hidden'>
  <div className='flex flex-col m-[5rem]'>
    <img src={PU} alt="No"/>
    <img src={Bus} alt="No"/>

  </div>
</div>

<div className='w-1/2 h-full bg-slate-100 flex items-center justify-center flex-col space-y-8'>


        <div className='flex flex-col items-center justify-center'>
          <h1>Welcome to PUTMS</h1>
          <h3>Admin Login</h3>
        </div>

        <div className='flex flex-col w-50 space-y-5 py-5 px-6 bg-blue-100 rounded-3xl'> 
          <input type="email" placeholder='Email / User Id'  className='bg-slate-100 rounded-sm px-2 py-1'/>
          <input type="password" placeholder='Password'  className='bg-slate-100 rounded-sm px-2 py-1'/>
          <button className='bg-green-500 py-2 px-[0.15rem] mt-4 mx-5 rounded-lg'>Submit</button>
        </div>

        <div>
          <button className='bg-green-500 py-2 px-2 my-2 mx-2 rounded-lg'><Link to="/user-login" className="text-black no-underline">User Login</Link></button>
          {/* <button className='bg-blue-500 py-2 px-2 my-2 mx-2 rounded-lg'><Link to="/forgot-password" className="text-black no-underline">Forgot Password</Link></button> */}

        </div>

      </div>
      
    </div>
    </>
  )
}
