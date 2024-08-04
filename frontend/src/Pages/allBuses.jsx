import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { FaBus } from 'react-icons/fa6';
import { toast } from 'react-toastify';


export default function AllBuses() {
  const [bus_data, setBusData] = useState([])
  useEffect(() => {
    axios.get('https://putms.onrender.com/all-Buses')
      .then(bus => setBusData(bus.data))
      .catch(err => console.log(err))
  },[])

  function ViewRoute() {
    toast.error("This feature is still in development!")
  }
  return (
    <>
      <Header />
      <div className='bg-slate-200 p-3'>
        <div className='flex flex-col bg-white p-3 shadow-lg'>
          <div className='flex space-x-2 text-center items-center text-blue-500'>
            <div className=''>
              <FaBus className='text-3xl mb-2' />
            </div>
            <h4 className='text-center font-semibold'>ALL BUSES INFORMATION</h4>
          </div>
          <div className='h-[0.1rem] bg-slate-200 w-[100%] mb-3'></div>

          <div>
            <Table striped bordered responsive hover variant="dark" className='text-center cursor-pointer'>
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Bus Number</th>
                  <th>Driver Name</th>
                  <th>Driver Contact</th>
                  <th>Area</th>
                  <th>Start Point</th>
                  <th>End Point</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bus_data.map((bus, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{bus.Bus_Number}</td>
                      <td>{bus.Driver_Name}</td>
                      <td>{bus.Driver_Contact}</td>
                      <td>{bus.Area}</td>
                      <td>{bus.Start_Point}</td>
                      <td>{bus.End_Point}</td>
                      <td><button className='bg-green-600 px-2 py-1 rounded-md hover:bg-green-800 transition ease-in-out' onClick={ViewRoute}>View Route</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
