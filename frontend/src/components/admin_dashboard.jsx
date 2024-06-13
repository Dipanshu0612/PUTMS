import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { NavLink as Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import PU2 from "../assests/PU2.png"
import '../index.css';
import { FaUsers, FaBus } from "react-icons/fa6";
import { FaLocationArrow, FaPlus, FaRupeeSign } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Footer from './footer';
import { Sidenav, Nav, Toggle } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import 'rsuite/Sidenav/styles/index.css';
import 'rsuite/Nav/styles/index.css';

export default function Admin_Dashboard() {
    let [menuicon, changemenuicon] = useState(false);
    const [show, setShow] = useState(false);
    const [expanded, setExpanded] = useState(true);
  const [activeKey, setActiveKey] = useState('1');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='flex flex-wrap justify-between items-center bg-gray-800 h-[4.3rem] sticky top-0 z-10 '>
                <div className="logo flex flex-wrap">
                    <a href="/" className='flex flex-wrap justify-center items-center cursor-pointer font-semibold'><img src={PU2} alt="" className='h-[3rem] mx-4 mb-[0.1rem] rounded-md' /></a>
                    <h4 className='flex text-white items-center mt-2 font-extrabold text-4xl'>PU-TMS</h4>
                </div>
            </div>


            {/* <div className='h-[90vh] w-1/6 bg-gray-700 my-[0.01rem] fixed top-19 left-0'>
                <ul className='flex flex-col flex-wrap justify-centre items-start p-0 admin text-xl'>
                    <li className="text-white cursor-pointer my-2 w-full p-2 font-semibold hover:bg-gray-900" ><Link to="/admin_home" activeClassName='active' className="!text-white flex items-center"><FaUsers className='mr-3 text-2xl'/> View All Users</Link></li>
                    <li className="text-white cursor-pointer my-2 w-full p-2 font-semibold hover:bg-gray-900" ><Link to="/all-Users" activeClassName='active' className="!text-white flex items-center"><FaPlus className='mr-3 text-2xl'/> Add User</Link></li>
                    <li className="text-white cursor-pointer my-2 w-full p-2 font-semibold hover:bg-gray-900" ><Link to="/admin_all_buses" activeClassName='active' className="!text-white flex"><FaBus className='mr-3 text-2xl'/>View All Buses</Link></li>
                    <li className="text-white cursor-pointer my-2 w-full p-2 font-semibold hover:bg-gray-900" ><Link to="/all-Buses" activeClassName='active' className="!text-white flex"><FaPlus className='mr-3 text-2xl'/>Add Bus</Link></li>
                    <li className="text-white cursor-pointer my-2 w-full p-2 font-semibold hover:bg-gray-900 " ><Link to="/my-bus-pass" activeClassName='active' className="!text-white flex text-[1rem] items-center"><FaRupeeSign className='mr-3 text-2xl'/>View Recent Transactions</Link></li>
                    <li className="text-white cursor-pointer my-2 w-full p-2 font-semibold hover:bg-gray-900" ><Link to="/feedback" activeClassName='active' className="!text-white flex"><MdNotificationsActive className='mr-3 text-2xl'/>Push Notice</Link></li>
                    <li className="cursor-pointer my-2 w-full p-2 font-semibold hover:bg-gray-900" ><a href="https://ums.paruluniversity.ac.in/" className='text-white flex'><FaLocationArrow className='mr-3 text-2xl'/>GNUMS</a></li>
                    <li className="cursor-pointer my-2 w-full p-2 font-semibold hover:bg-gray-900" ><Link to="/" activeClassName='active' className="!text-white flex"><RiLogoutBoxRLine className='mr-3 text-2xl'/>Logout</Link></li>
                </ul>
            </div> */}
       <div className='w-[13rem] bg-gray-700 h-[90vh]'>     
      <Sidenav expanded={expanded} defaultOpenKeys={['3', '4']} appearance='subtle' className='text-white'>
        <Sidenav.Body className='bg-gray-700 hover:bg-gray-700'>
          <Nav activeKey={activeKey} onSelect={setActiveKey} className=''>
            <Nav.Item eventKey="1" icon={<DashboardIcon />} className='text-white'>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              User Group
            </Nav.Item>
            <Nav.Menu placement="rightStart" eventKey="3" title="Advanced" icon={<MagicIcon />}>
              <Nav.Item eventKey="3-1">Geo</Nav.Item>
              <Nav.Item eventKey="3-2">Devices</Nav.Item>
              <Nav.Item eventKey="3-3">Loyalty</Nav.Item>
              <Nav.Item eventKey="3-4">Visit Depth</Nav.Item>
            </Nav.Menu>
            <Nav.Menu
              placement="rightStart"
              eventKey="4"
              title="Settings"
              icon={<GearCircleIcon />}
            >
              <Nav.Item eventKey="4-1">Applications</Nav.Item>
              <Nav.Item eventKey="4-2">Channels</Nav.Item>
              <Nav.Item eventKey="4-3">Versions</Nav.Item>
              <Nav.Menu eventKey="4-5" title="Custom Action">
                <Nav.Item eventKey="4-5-1">Action Name</Nav.Item>
                <Nav.Item eventKey="4-5-2">Action Params</Nav.Item>
              </Nav.Menu>
            </Nav.Menu>
          </Nav>
        </Sidenav.Body>
        <Sidenav.Toggle onToggle={expanded => setExpanded(expanded)} />
      </Sidenav>
      </div>
        </>
    )
}
