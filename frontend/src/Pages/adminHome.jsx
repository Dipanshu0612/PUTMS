import React, { useEffect, useState } from 'react'
import Admin_Sidebar from '../components/Admin_Sidebar'
import { FaPlus, FaUsers } from 'react-icons/fa6'
import { RxDashboard } from 'react-icons/rx'
import { GoBellFill } from 'react-icons/go'
import Footer from '../components/footer'
import CountUp from 'react-countup'
import axios from 'axios'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';


export default function AdminHome() {
  const [user_data, setUserData] = useState([])
  const [bus_data, setBusData] = useState([])
  useEffect(() => {
    axios.get('https://putms.onrender.com/all-users')
      .then(user => setUserData(user.data))
      .catch(err => console.log(err))

    axios.get('https://putms.onrender.com/all-buses')
      .then(bus => setBusData(bus.data))
      .catch(err => console.log(err))
  })

  return (
    <>
      <Admin_Sidebar />
      <div className='bg-slate-200'>
        <div className='bg-slate-200 p-3 m-2 space-y-5 flex flex-col'>
          <div className='flex flex-col bg-white p-3 shadow-lg m-3'>
            <div className='flex space-x-2 text-center items-center text-blue-500'>
              <div className=''>
                <RxDashboard className='text-3xl mb-2' />
              </div>
              <h4 className='text-center font-semibold'>DASHBOARD</h4>
            </div>

            <div className='h-[0.1rem] bg-slate-200 w-[100%] mb-3'></div>

            <div className='flex justify-around items-center text-center'>
              <div className='h-[10rem] w-[10rem] flex flex-col items-center rounded-md bg-red-500 text-white justify-center cursor-pointer hover:bg-red-700'>
                <h4>Total Users</h4>
                <h3 className='text-[5rem]'>
                  <CountUp end={user_data.length} />
                </h3>
              </div>
              <div className='h-[10rem] w-[10rem] flex flex-col items-center rounded-md bg-blue-500 text-white justify-center cursor-pointer hover:bg-blue-700'>
                <h4>Total Buses</h4>
                <h3 className='text-[5rem]'>
                  <CountUp end={bus_data.length} />
                </h3>
              </div>
              <div className='h-[10rem] w-[10rem] flex flex-col items-center rounded-md bg-green-500 text-white justify-center cursor-pointer hover:bg-green-700'>
                <h6>Total Amonut of Transacation</h6>
                <h3 className='text-[5rem]'>
                  <CountUp end={0} />
                </h3>
              </div>
              <div className='h-[10rem] w-[10rem] flex flex-col items-center rounded-md bg-yellow-500 text-white justify-center cursor-pointer hover:bg-yellow-700'>
                <h5>Expired Bus Pases</h5>
                <h3 className='text-[5rem]'>
                  <CountUp end={0} />
                </h3>
              </div>
            </div>

            <div className='h-[15rem] mt-4'>
              <div className='flex space-x-2 text-center items-center text-blue-500'>
                <div className=''>
                  <GoBellFill className='text-3xl mb-2' />
                </div>
                <h4 className='text-center font-semibold'>NOTICE</h4>
              </div>
              <div className='h-[0.1rem] bg-slate-200 w-[100%]'></div>
              <div className='w-full h-[10rem] my-3'>
                <h4>There are currently no Notices! </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
