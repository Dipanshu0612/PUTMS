import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaAddressCard, FaRupeeSign } from "react-icons/fa";
import PU3 from "../assests/PU3.png";
import NAAC from "../assests/NAAC.png";
import My from "../assests/My.jpg";
import { MdDownload } from "react-icons/md";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import axios from 'axios';
import { usePDF } from 'react-to-pdf';
import "../index.css";
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


const BusPass = React.memo(() => {
    const user_id = sessionStorage.getItem("user_id");
    const [userData, setUserData] = useState([]);
    const { toPDF, targetRef } = usePDF({ filename: `${user_id}_BusPass.pdf` });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const getUserInfo = useCallback(async () => {
        setLoading(true);
        if (!user_id) return;
        try {
            let response = await axios.post(
              "https://putms.onrender.com/get_user_info",
              { user_id },
              {
                headers: {
                  Authorization: `Bearer ${sessionStorage.getItem(
                    "authToken"
                  )}`,
                },
              }
            );
            if (response.data.success) {
              setUserData(response.data.data);
            } else {
              toast.error(response.data.message);
              navigate("/");
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        finally {
            setLoading(false);
        }
    }, [user_id,navigate]);

    useEffect(() => {
        getUserInfo();
    }, [getUserInfo]);

    const feesPaid = useMemo(() => userData.Bus_Fees_Paid === "Yes", [userData.Bus_Fees_Paid]);

    const openRazorpay = useCallback(() => {
        const options = {
            key: "rzp_test_CXhrGKDYeZO527",
            one_click_checkout: true,
            amount: 22000 * 100,
            name: "Parul University Transport Department",
            order_id: "",
            show_coupons: true,
            callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
            handler: (response) => {
                axios.post("https://putms.onrender.com/payment", { response, user_id });
            }
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    }, [user_id]);

    return (
        <>
        {user_id === null ? navigate('/') : null}
        {loading && <Spinner />}
            <Header />
            <div className='w-full max-h-min flex px-2 bg-slate-200 md:flex-col sm:flex-col p-3'>
                <div className='w-2/3 mb-3 bg-slate-100 p-3 cursor-pointer shadow-lg md:w-full sm:w-full' ref={targetRef}>
                    <div className='flex space-x-2 text-center items-center text-blue-500'>
                        <FaAddressCard className='text-3xl mb-2' />
                        <h4 className='text-center font-semibold'>BUS PASS</h4>
                    </div>
                    <div className='h-[0.1rem] bg-slate-200 w-[100%]'></div>
                    <div className='border border-black h-[22rem] my-3 hover:bg-slate-50 sm:h-[45rem]'>
                        <div className='h-[5.5rem] flex justify-between py-2 px-4 bg-green-600'>
                            <img src={NAAC} alt="Naac" className='w-1/3 h-full p-1' />
                            <img src={PU3} alt="PuLogo" className='w-1/3 h-full' />
                        </div>
                        <div className='h-[16.5rem] flex p-2 space-x-2 sm:flex-col sm:items-center sm:space-y-5'>
                            <div className='w-1/3 sm:w-1/2 sm:flex sm:items-center sm:justify-center'>
                                <img src={user_id === "210305105661" ? My : "https://thumbs.dreamstime.com/b/profile-pic-icon-isolated-white-background-your-web-mobile-app-design-133862807.jpg"} alt="UserIMG" className='border border-black object-cover rounded-lg mix-blend-multiply sm:rounded-full sm:h-[15rem] sm:w-[15rem]' />
                            </div>
                            <div className='w-2/3 flex p-2 tracking-wide text-4xl gap-4 relative mb-1 md:text-2xl sm:text-xl sm:w-full'>
                                <div className='flex flex-col space-y-5 justify-center mb-5 md:space-y-3'>
                                    <h6 className='font-bold'>Name : {userData.Name}</h6>
                                    <h6 className='font-bold'>Enrollment : {userData.Enrollment || userData.MIS_ID}</h6>
                                    <h6 className='font-bold'>Card ID : {userData.Card_ID}</h6>
                                    <h6 className='font-bold'>Bus Pass No : {userData.Bus_Pass_No}</h6>
                                    <h6 className='font-bold'>Department : {userData.Department}</h6>
                                </div>
                                <div className='flex flex-col space-y-5 justify-center mb-5 md:space-y-3'>
                                    <h6 className='font-bold'>Institute : {userData.Institute}</h6>
                                    <h6 className='font-bold'>Shift Time : {userData.Shift} PM</h6>
                                    <h6 className='font-bold'>Area : {userData.Area}</h6>
                                    <h6 className='font-bold'>Contact : {userData.Mobile}</h6>
                                    <h6 className='font-bold'>Valid Upto : 30-6-2025</h6>
                                </div>
                                <div className='flex absolute border border-black p-1 bottom-0 bg-green-500'>
                                    <h5 className='m-0'>{userData.Designation}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-1/3 m-3 bg-slate-100 p-3 flex flex-col space-y-1 shadow-lg cursor-pointer md:w-1/2 sm:w-full'>
                    <div className='flex space-x-2 text-center items-center text-blue-500'>
                        <FaMoneyCheckDollar className='text-3xl mb-2' />
                        <h4 className='text-center font-semibold'>FEES INFO</h4>
                    </div>
                    <div className='h-[0.1rem] bg-slate-200 w-[100%]'></div>
                    <div className='my-3 p-2'>
                        <table className='buspass'>
                            <tbody>
                                <tr className='bg-slate-200 hover:bg-slate-300'>
                                    <td className='w-[45%]'>Total Fees</td>
                                    <td className='w-[5%]'>:</td>
                                    <td className='w-[50%] text-left'>Rs. 22000/-</td>
                                </tr>
                                <tr className='hover:bg-slate-200'>
                                    <td className='w-[30%]'>Fees Paid</td>
                                    <td className='w-[5%]'>:</td>
                                    <td className='w-[50%]'>
                                        <span style={{
                                            backgroundColor: feesPaid ? 'green' : 'red',
                                            color: 'white',
                                            padding: '2px 5px',
                                            borderRadius: '3px'
                                        }}>
                                            {feesPaid ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                </tr>
                                <tr className='bg-slate-200 hover:bg-slate-300'>
                                    <td className='w-[30%]'>Transaction ID</td>
                                    <td className='w-[5%]'>:</td>
                                    <td className='w-[50%]'>{userData.transaction_id || "No Transaction ID"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='flex'>
                        <button className='flex flex-col bg-blue-500 items-center justify-center px-[1.4rem] py-4 m-2 hover:bg-blue-800 ease-in-out transition font-bold hover:text-white rounded-md duration-200' onClick={() => toPDF()}>
                            <MdDownload className='text-[3rem]' />
                            Download Virtual Bus Pass
                        </button>
                        <button className={`flex flex-col bg-green-500 items-center justify-center px-[3rem] py-4 font-bold text-xl m-2 hover:bg-green-700 hover:text-white rounded-md transition ease-in-out duration-200 disabled:cursor-not-allowed`} onClick={openRazorpay} disabled={feesPaid}>
                            <FaRupeeSign className='text-[3rem]' />
                            Pay Bus Fees
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
});

export default BusPass;
