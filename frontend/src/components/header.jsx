import React, { useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { NavLink as Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import PU2 from "../assests/PU2.png"

export default function Header() {
  let [menuicon, changemenuicon] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      
      <div className='flex flex-wrap justify-between items-center bg-gray-800 h-[4.3rem] sticky top-0 z-10 '>
        <div className="logo flex flex-wrap">
          <a href="/" className='flex flex-wrap justify-center items-center cursor-pointer font-semibold'><img src={PU2} alt="" className='h-[3rem] mx-4 mb-[0.1rem] rounded-md' /></a>
          <h4 className='flex text-white items-center mt-2 font-extrabold text-4xl'>PU-TMS</h4>
        </div>

        <div className="nav" id='nav'>
          <ul className='flex flex-wrap justify-centre items-center mr-4 space-x-5'>
            <li className="text-white cursor-pointer py-[1.37rem] font-semibold "><Link to="/" activeClassName='active'>Home</Link></li>
            <li className="text-white cursor-pointer py-[1.37rem] font-semibold " ><Link to="/my-bus-pass" activeClassName='active'>My Bus Pass</Link></li>
            <li className="text-white cursor-pointer py-[1.37rem] font-semibold" ><Link to="/allBuses" activeClassName='active'>View All Buses</Link></li>
            <li className="text-white cursor-pointer py-[1.37rem] font-semibold" ><Link to="/feedback" activeClassName='active'>Feedback</Link></li>
            <li className="text-white cursor-pointer py-[1.37rem] font-semibold" ><a href="https://ums.paruluniversity.ac.in/">GNUMS</a></li>
            <li className="text-white cursor-pointer py-[1.37rem] font-semibold" onClick={handleShow}><CgProfile className='text-2xl' /></li>
          </ul>
        </div>

        {menuicon ? <AiOutlineClose id='menuicon' onClick={() => {
          document.getElementById('nav').style.display = 'none'
          changemenuicon((prevState) => !prevState)
        }} />
          : <AiOutlineMenu id='menuicon' onClick={() => {
            document.getElementById('nav').style.display = 'block'
            changemenuicon((prevState) => !prevState)
          }} />}

      </div>
    </>
  )
}
