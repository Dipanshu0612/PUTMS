import React, { useEffect, useState } from 'react'
import Footer from '../components/footer'
import { FaBus, FaPlus } from 'react-icons/fa6'
import Table from 'react-bootstrap/esm/Table'
import axios from 'axios'
import { toast } from 'react-toastify'
import Admin_Sidebar from '../components/Admin_Sidebar'

export default function AdminAllBuses() {
    const [bus_data, setBusData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3001/all-Buses')
            .then(bus => setBusData(bus.data))
            .catch(err => console.log(err))
    },[])

    async function RemoveBus(bus_number) {
        let response = await axios.post("http://localhost:3001/removeBus", { bus_number })
        console.log(response.data)
      }

    function ViewRoute() {
        toast.error("This feature is still in development!")
    }



    return (
        <>
            <Admin_Sidebar />
            <div className='bg-slate-200'>
                <div className='bg-slate-200 p-3 m-2 space-y-5 flex flex-col'>
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
                                                <td><button className='bg-green-600 px-2 py-1 rounded-md hover:bg-green-800 transition ease-in-out' onClick={ViewRoute}>View Route</button> <button className='bg-red-500 px-2 py-1 rounded-md hover:bg-red-800 transition ease-in-out' onClick={() => {
                      RemoveBus(bus.Bus_Number)
                      toast.success("Bus Successfully Removed!")
                      }}>Remove Bus</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>

                    </div>
                    <div className='flex justify-end mr-5'>
                    <button className='bg-blue-500 p-2 w-[7rem] text-white flex items-center justify-center rounded-lg'><FaPlus className='mr-2'/>Add Bus</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
