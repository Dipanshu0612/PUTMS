import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { FaBus } from "react-icons/fa6";
import { GoBellFill } from "react-icons/go";
import { GrBus } from "react-icons/gr";
import { TbUser } from "react-icons/tb";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import My from "../assests/My.jpg"
import axios from 'axios';

export default function Home() {
  const user_id = sessionStorage.getItem("user_id");
  const [userData, setUserData] = useState({});
  const [busData, setBusData] = useState({});

  async function getUserInfo() {
    let response = await axios.post("http://localhost:3001/getUserInfo", { user_id });
    setUserData(response.data);
    const busArea = response.data.Area;
    let busResponse = await axios.post("http://localhost:3001/getBusInfo", { busArea });
    setBusData(busResponse.data);
  }
  useEffect(() => {
    getUserInfo();
  })

  return (
    <>
      <Header />

      <div className='main h-[50rem] bg-slate-200 flex'>
        <div className='m-3 bg-slate-100 h-[45rem] w-1/4 shadow-lg flex space-y-2 flex-col items-center py-3 overflow-hidden cursor-pointer'>
          <img src={My} alt="UserIMG" className='border border-black object-cover rounded-full h-[15rem] w-[15rem]' />
          <div className='h-[0.1rem] bg-slate-200 w-[90%]'></div>
          <h2 className='hover:bg-gray-300 p-2 font-extrabold'>{userData.Name}</h2>
          <div className='h-[0.1rem] bg-slate-200 w-[90%]'></div>
          <h4 className='hover:bg-gray-300 p-2'>{userData.Department}</h4>
          <div className='h-[0.1rem] bg-slate-200 w-[90%]'></div>
          <h4 className='hover:bg-gray-300 p-2 font-semibold'>{userData.Enrollment || userData.MIS_ID}</h4>
          <div className='h-[0.1rem] bg-slate-200 w-[90%]'></div>
          <h4 className='hover:bg-gray-300 p-2'>Semester : {userData.Semester}</h4>
          <div className='h-[0.1rem] bg-slate-200 w-[90%]'></div>
          <h4 className='hover:bg-gray-300 p-2  '>Mobile : {userData.Mobile}</h4>
          <div className='h-[0.1rem] bg-slate-200 w-[90%]'></div>
          <h4 className='hover:bg-gray-300 p-2'>Area : {userData.Area}</h4>
          <div className='h-[0.1rem] bg-slate-200 w-[90%]'></div>
          <h4 className='hover:bg-gray-300 p-2'>Boarding Point : Maneja</h4>
          <div className='h-[0.1rem] bg-slate-200 w-[90%]'></div>

        </div>
        <div className='m-3 bg-slate-100 h-[45rem] w-3/4 shadow-lg flex flex-col space-y-5 py-3 px-3'>
          <div className='h-[21rem] '>
            <div className='flex space-x-2 text-center items-center text-blue-500'>
              <div className=''>
                <FaBus className='text-3xl mb-2' />
              </div>
              <h4 className='text-center font-semibold'>BUS INFORMATION</h4>
            </div>
            <div className='h-[0.1rem] bg-slate-200 w-[100%]'></div>
            <div className='flex h-[85%] my-2 gap-3 space-x-4'>
              <div className='flex flex-col w-1/3 bg-yellow-100 p-4 text-center rounded-lg shadow-sm cursor-pointer'>
                <h5 className='font-bold uppercase text-3xl'><GrBus className='inline mr-3 text-[2rem]' />Current Bus</h5>
                <div className='h-[0.01rem] bg-black w-[100%]'></div>
                <h4 className='text-center w-full text-[2.5rem] mt-3 tracking-widest'>GJ 06 BY</h4>
                <h2 className='text-center w-full text-[5rem] font-extrabold tracking-wide'>{busData.Bus_Number}</h2>

              </div>

              <div className='flex w-2/3 flex-col justify-center space-y-2'>
                <h3 className='bg-slate-100 p-2 rounded-md cursor-pointer hover:bg-gray-300'><TbUser className='inline mr-2 text-[2rem] justify-center' />Driver Name : {busData.Driver_Name}</h3>
                <div className='h-[0.15rem] bg-slate-200 w-[100%]'></div>
                <h3 className='bg-slate-200 p-2 rounded-md cursor-pointer hover:bg-gray-300'><FaPhoneAlt className='inline mr-3 ml-1 text-[1.5rem] justify-center' />Contact : {busData.Driver_Contact}</h3>
                <div className='h-[0.15rem] bg-slate-200 w-[100%]'></div>
                <h3 className='bg-slate-100 p-2 rounded-md cursor-pointer hover:bg-gray-300'><FaLocationDot className='inline mr-3 ml-1 text-[1.5rem] justify-center' />Area : {busData.Area}</h3>
                <div className='h-[0.15rem] bg-slate-200 w-[100%]'></div>
                <h3 className='bg-slate-200 p-2 rounded-md cursor-pointer hover:bg-gray-300'><IoMdTime className='inline mr-3 ml-1 text-[1.5rem] justify-center' />Departure Time : 5:15 PM</h3>

              </div>
            </div>
          </div>

          <div className='h-[0.1rem] bg-slate-300 w-[100%]'></div>

          <div className='h-[21rem]'>
            <div className='flex space-x-2 text-center items-center text-blue-500'>
              <div className=''>
                <GoBellFill className='text-3xl mb-2' />
              </div>
              <h4 className='text-center font-semibold'>NOTICE</h4>
            </div>
            <div className='h-[0.1rem] bg-slate-200 w-[100%]'></div>
            <div className='w-full h-[15rem] hover:bg-gray-200 my-3'>
              <h4>There are currently no Notices! </h4>
            </div>
          </div>

        </div>
      </div>

      <Footer />

    </>
  )

}
