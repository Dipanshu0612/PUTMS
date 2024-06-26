import React, { useEffect, useState, useCallback, useRef } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { FaAddressCard } from "react-icons/fa"
import PU3 from "../assests/PU3.png"
import NAAC from "../assests/NAAC.png"
import My from "../assests/My.jpg"
import { MdDownload } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { toast } from 'react-toastify'
import axios from 'axios'
import { usePDF } from 'react-to-pdf';



export default function BusPass() {
    const user_id = sessionStorage.getItem("user_id");
    const [userData, setUserData] = useState({});
    const { toPDF, targetRef } = usePDF({ filename: `${user_id}_BusPass.pdf` });
    async function getUserInfo() {
        let response = await axios.post("http://localhost:3001/getUserInfo", { user_id });
        setUserData(response.data);
    }
    useEffect(() => {
        getUserInfo();
    }, [])

    const openRazorpay = () => {
        let options = {
            "key": "rzp_test_CXhrGKDYeZO527",
            "one_click_checkout": true,
            "amount": 22000 * 100,
            "name": "Parul Univerity Transport Department",
            "order_id": "",
            "show_coupons": true,
            "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
            handler: function (response) {
            }
        }
        let rzp1 = new window.Razorpay(options);
        rzp1.open()
    }
    return (
        <>
            <Header />
            <div className='w-full h-[30rem] flex px-2 bg-slate-200'>
                <div className='w-2/3 m-3 bg-slate-100 p-3 cursor-pointer shadow-lg' ref={targetRef}>
                    <div className='flex space-x-2 text-center items-center text-blue-500'>
                        <FaAddressCard className='text-3xl mb-2' />
                        <h4 className='text-center font-semibold'>BUS PASS</h4>
                    </div>
                    <div className='h-[0.1rem] bg-slate-200 w-[100%]'></div>
                    <div className='border border-black h-[22rem] my-3 hover:bg-slate-50' >
                        <div className='h-[5.5rem] flex justify-between p-2 bg-green-600'>
                            <img src={NAAC} alt="Naac" className='w-1/3 h-full p-1' />
                            <img src={PU3} alt="PuLogo" className='w-1/3 h-full' />
                        </div>
                        <div className='h-[16.5rem] flex p-2 space-x-2'>
                            <div className='w-1/3'>
                                <img src={My} alt="UserIMG" className='border border-black object-cover rounded-lg' />
                            </div>
                            <div className='w-2/3 flex p-2 tracking-wide text-4xl gap-4'>
                                <div className='flex flex-col space-y-3 justify-center'>
                                    <h5 className='font-bold'>Name : {userData.Name}</h5>
                                    <h5 className='font-bold'>Enrollment : {userData.Enrollment || userData.MIS_ID}</h5>
                                    <h5 className='font-bold'>Card ID : {userData.Card_ID}</h5>
                                    <h5 className='font-bold'>Bus Pass No : {userData.Bus_Pass_No}</h5>
                                    <h5 className='font-bold'>Department : {userData.Department}</h5>
                                </div>
                                <div className='flex flex-col space-y-5 justify-center'>
                                    <h5 className='font-bold'>Institute : {userData.Institute}</h5>
                                    <h5 className='font-bold'>Shift Time : {userData.Shift}</h5>
                                    <h5 className='font-bold'>Area : {userData.Area}</h5>
                                    <h5 className='font-bold'>Contact : {userData.Mobile}</h5>
                                    <h5 className='font-bold'>Valid Upto : 30-6-2024</h5>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
                <div className='w-1/3 m-3 bg-slate-100 p-3 flex items-center justify-center flex-col space-y-5 shadow-lg'>
                    <button className='flex flex-col bg-blue-500 items-center justify-center px-[1.4rem] py-4 m-2 hover:bg-blue-800 ease-in-out transition font-bold hover:text-white rounded-md duration-200   ' onClick={() => toPDF()}>
                        <MdDownload className='text-[5rem]' />
                        Download Virtual Bus Pass
                    </button>
                    <button className='flex flex-col bg-green-500 items-center justify-center px-[3.7rem] py-4 font-bold text-xl m-2 hover:bg-green-700 hover:text-white rounded-md transition ease-in-out duration-200' onClick={openRazorpay}>
                        <FaRupeeSign className='text-[4rem]' />
                        Pay Bus Fees
                    </button>
                </div>
            </div>
            <Footer />
        </>
    )
}
