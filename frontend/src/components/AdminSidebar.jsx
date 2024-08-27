import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu, AiOutlineNotification } from 'react-icons/ai';
import { NavLink as Link } from 'react-router-dom';
import PU2 from "../assests/PU2.png"
import { RxDashboard } from "react-icons/rx";
import "./Sidebar.css"
import { FaUserGroup } from "react-icons/fa6";
import { TbBus } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";
import { toast } from "react-toastify"
import { VscFeedback } from "react-icons/vsc";

export default function AdminSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <div className='flex flex-wrap justify-between items-center bg-gray-800 h-[4.3rem] sticky top-0 z-10'>
                <div className="logo flex flex-wrap justify-center items-center ml-4">
                    {isOpen ? <AiOutlineClose className='text-white text-3xl cursor-pointer' onClick={toggle} /> :
                        <AiOutlineMenu className='text-white text-3xl cursor-pointer' onClick={toggle} />}
                    <a href="/" className='flex flex-wrap justify-center items-center cursor-pointer font-semibold'><img src={PU2} alt="" className='h-[3rem] mx-4 mb-[0.1rem] rounded-md' /></a>
                    <h4 className='flex text-white items-center mt-2 font-extrabold text-4xl'>PU-TMS</h4>
                </div>
            </div>
            <div className={`w-[250px] bg-gray-800 ${isOpen ? "fixed" : "hidden"} h-[100vh] sidebar`}>
                <ul className='flex flex-col flex-wrap p-0'>
                    <li className="text-white cursor-pointer py-[1.37rem] font-semibold flex space-x-2 justify-start items-center">
                        <RxDashboard />
                        <Link to="/admin_home" activeClassName='active' className="text-white">Dashboard</Link>
                    </li>
                    <li className="text-white cursor-pointer py-[1.37rem] font-semibold flex space-x-2 items-center justify-start">
                        <FaUserGroup />
                        <Link to="/all_users" activeClassName='active' className="text-white">Show Users</Link>
                    </li>
                    <li className="text-white cursor-pointer py-[1.37rem] font-semibold flex space-x-2 items-center justify-start">
                        <TbBus />
                        <Link to="/all_buses" activeClassName='active' className="text-white">Show Buses</Link>
                    </li>
                    <li className="text-white cursor-pointer py-[1.37rem] font-semibold flex space-x-2 items-center justify-start">
                        <GrTransaction />
                        <Link to="transactions" activeClassName='active' className="text-white">Show Transactions</Link>
                    </li>
                    <li className="text-white cursor-pointer py-[1.37rem] font-semibold flex space-x-2 items-center justify-start">
                        <AiOutlineNotification />
                        <Link to="/push_notification" activeClassName='active' className="text-white">Push Notification</Link>
                    </li>
                    <li className="text-white cursor-pointer py-[1.37rem] font-semibold flex space-x-2 items-center justify-start">
                    <VscFeedback />
                        <Link to="/feedbacks" activeClassName='active' className="text-white">User Feedback</Link>
                    </li>
                    <li className="text-white cursor-pointer py-[1.37rem] font-semibold flex space-x-2 items-center justify-start">
                        <FaLocationArrow />
                        <a href="https://ums.paruluniversity.ac.in" target='_blank' className='decoration-none text-white' rel='noreferrer'>GNUMS</a>
                    </li>
                    <li className="text-white cursor-pointer py-[1.37rem] font-semibold flex space-x-2 items-center justify-start" onClick={()=>{
                            sessionStorage.removeItem("user_id")
                            toast.success("Logout Successful!")
                    }}>
                        <IoIosLogOut />
                        <Link to="/" activeClassName='active' className="text-white">Logout</Link>
                    </li>
                </ul>
            </div>


        </>
    )
}
