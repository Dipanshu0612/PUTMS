import React from 'react'
import {useNavigate} from "react-router-dom"

export default function Header_dropdown() {
    let navigate=useNavigate();
  return (
    <div className='flex flex-col w-[10rem] h-[2.5rem] absolute top-[4.3rem] right-0 bg-gray-800'>
        <ul className='flex flex-col text-white justify-center text-xl pt-1'>
            <li><button onClick={()=>{
              sessionStorage.removeItem("user_id");
                navigate("/")
            }}>Logout</button></li>
        </ul>
    </div>
  )
}

