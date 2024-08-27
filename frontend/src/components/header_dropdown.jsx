import React from 'react'
import {useNavigate} from "react-router-dom"

export default function HeaderDropdown() {
    let navigate=useNavigate();
  return (
    <div className='flex flex-col w-[10.55rem] absolute top-[4.3rem] right-0 bg-gray-800 justify-center items-center md:top-[25.4rem] md:bg-[#111827]'>
        <ul className='flex flex-col text-blue-600 justify-center text-xl p-3 space-y-2 font-bold'>
          <li className='hover:text-blue-800 text-[1rem]'><button onClick={()=>{
                navigate("/change-password")
            }}>Change Password</button></li>
            <li className='hover:text-blue-800 text-[1rem]'><button onClick={()=>{
              sessionStorage.removeItem("user_id");
                navigate("/")
            }}>Logout</button></li>
        </ul>
    </div>
  )
}

