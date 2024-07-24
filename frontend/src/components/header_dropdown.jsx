import React from 'react'
import {useNavigate} from "react-router-dom"

export default function Header_dropdown() {
    let navigate=useNavigate();
  return (
    <div className='flex flex-col w-[10rem] h-fit absolute top-[4.3rem] right-0 bg-gray-800 justify-center items-center'>
        <ul className='flex flex-col text-blue-600 justify-center text-xl p-2 space-y-2 text-[1rem] items-start font-bold'>
          <li className='hover:text-blue-800'><button onClick={()=>{
                navigate("/change-password")
            }}>Change Password</button></li>
            <li className='hover:text-blue-800'><button onClick={()=>{
              sessionStorage.removeItem("user_id");
                navigate("/")
            }}>Logout</button></li>
        </ul>
    </div>
  )
}

