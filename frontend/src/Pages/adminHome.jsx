import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import { RxDashboard } from 'react-icons/rx'
import { GoBellFill } from 'react-icons/go'
import Footer from '../components/footer'
import CountUp from 'react-countup'
import axios from 'axios'
import { AiOutlineClose } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { NavLink as Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from '../components/Spinner'

export default function AdminHome() {
  const [user_data, setUserData] = useState([])
  const [bus_data, setBusData] = useState([])
  const [loading, setLoading] = useState(false);
  const [notificationData, setNotification] = useState([]);
  const [curr_notification, setCurrNotification] = useState({
    title: "",
    message: ""
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getData(){
    setLoading(true);
    try {
      let response = await axios.get('https://putms.onrender.com/get_all_users')
      setUserData(response.data)
      let response2 = await axios.get('https://putms.onrender.com/get_all_buses')
      setBusData(response2.data)
      let response3= await axios.get("https://putms.onrender.com/get_notifications")
      setNotification(response3.data);
    } catch (error) {
      toast.error(error)
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const handleDeleteNotification = async (title) => {
    let response = await axios.post("https://putms.onrender.com/delete_notification", { title })
    if (response.data.success) {
      toast.success("Notification Deleted Successfully");
    } else {
      toast.error("Failed to Delete Notification");
    }
  }

  return (
    <>
    {loading && <Spinner />}
      <AdminSidebar />
      <div className='bg-slate-200'>
        <div className='bg-slate-200 sm:!p-1 sm:!m-1 md:!p-1 md:!m-1 space-y-5 flex flex-col'>
          <div className='flex flex-col bg-white p-3 m-3 shadow-lg max-h-min sm:p-2 sm:m-1 md:p-2 md:m-1'>
            <div className='flex space-x-2 text-center items-center text-blue-500'>
              <div className=''>
                <RxDashboard className='text-3xl mb-2' />
              </div>
              <h4 className='text-center font-semibold'>DASHBOARD</h4>
            </div>

            <div className='h-[0.1rem] bg-slate-200 w-[100%] mb-3'></div>

            <div className='flex justify-around items-center text-center flex-wrap sm:gap-2'>
              <div className='h-[10rem] w-[10rem] flex flex-col items-center rounded-md bg-red-500 text-white justify-center cursor-pointer hover:bg-red-700 md:h-[8rem] md:w-[8rem] sm:h-[6rem] sm:w-[6rem] sm:p-1'>
                <h4 className='sm:text-[0.8rem]'>Total Users</h4>
                <h3 className='text-[5rem] md:text-[4rem] sm:text-[3rem]'>
                  <CountUp end={user_data.length} className='sm:text-[2rem]'/>
                </h3>
              </div>
              <div className='h-[10rem] w-[10rem] flex flex-col items-center rounded-md bg-blue-500 text-white justify-center cursor-pointer hover:bg-blue-700 md:h-[8rem] md:w-[8rem] sm:h-[6rem] sm:w-[6rem]'>
                <h4 className='sm:text-[0.8rem]'>Total Buses</h4>
                <h3 className='text-[5rem] md:text-[4rem] sm:text-[3rem]'>
                  <CountUp end={bus_data.length} className='sm:text-[2rem]'/>
                </h3>
              </div>
              <div className='h-[10rem] w-[10rem] flex flex-col items-center rounded-md bg-yellow-500 text-white justify-center cursor-pointer hover:bg-yellow-700 md:h-[8rem] md:w-[8rem] sm:h-[6rem] sm:w-[6rem]'>
                <h5 className='sm:text-[0.8rem]'>Expired Bus Pases</h5>
                <h3 className='text-[5rem] md:text-[4rem] sm:text-[3rem]'>
                  <CountUp end={user_data.filter(user => user.Bus_Fees_Paid === "No").length} className='sm:text-[2rem]'/>
                </h3>
              </div>
              <div className='h-[10rem] w-[15rem] flex flex-col items-center rounded-md bg-green-500 text-white justify-center cursor-pointer hover:bg-green-700 md:h-[8rem] md:w-[8rem] sm:h-[6rem] sm:w-[6rem]'>
                <h6 className='p-1 sm:text-[0.8rem]'>Total Amonut of Transacation</h6>
                <h3 className='text-[5rem] md:text-[4rem] sm:text-[3rem]'>
                  <CountUp end={user_data.filter(user => user.Bus_Fees_Paid === "Yes").length * 22000} className='text-[4rem] md:text-[2rem] sm:text-[1.2rem]'/>
                </h3>
              </div>
            </div>

            <div className='h-[17rem] mt-4 overflow-scroll'>
              <div className='flex space-x-2 text-center items-center text-blue-500'>
                <div className=''>
                  <GoBellFill className='text-3xl mb-2' />
                </div>
                <h4 className='text-center font-semibold'>NOTICE</h4>
              </div>
              <div className='h-[0.1rem] bg-slate-200 w-[100%]'></div>
              <div className='w-full h-[9rem] my-3 overflow-y-scroll'>
                {notificationData.map((item, index) => {
                  return (
                    <div key={index} className='px-2 py-2 m-2 rounded-md cursor-pointer bg-blue-100 flex justify-between'>
                      <h6 className='hover:underline text-blue-500 m-0' onClick={() => {
                        setCurrNotification({
                          title: item.title,
                          message: item.message
                        });
                        handleShow();
                      }}>{item.title}</h6>
                      <button className='bg-blue-500 p-1 mr-2' onClick={() => {
                        handleDeleteNotification(item.title);
                      }}><AiOutlineClose /></button>
                    </div>
                  )
                })}
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>{curr_notification.title}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>{curr_notification.message}</Modal.Body>
                  <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              <div className='flex justify-center items-center'>
                <button className='bg-blue-500 rounded-sm py-2 hover:bg-blue-700 ease-in-out transition-all'><Link to="/push_notification" className="text-white p-2">Push Notification</Link></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
