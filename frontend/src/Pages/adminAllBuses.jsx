import React, { useEffect, useState } from 'react'
import Footer from '../components/footer'
import { FaBus, FaPlus } from 'react-icons/fa6'
import Table from 'react-bootstrap/esm/Table'
import axios from 'axios'
import { toast } from 'react-toastify'
import AdminSidebar from '../components/AdminSidebar'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


export default function AdminAllBuses() {
    const [bus_data, setBusData] = useState([])
    const [show, setShow] = useState(false);
    const [newBusNo, setNewBusNo] = useState('');
    const [newDriverName, setNewDriverName] = useState('');
    const [newDriverContact, setNewDriverContact] = useState('');
    const [newStartPoint, setNewStartPoint] = useState('');
    const [newEndPoint, setNewEndPoint] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true)
    };
    const handleSelectChange = (e) => {
        setSelectedArea(e.target.value);
    }
    async function handleAddNewBus() {
        let response = await axios.post("https://putms.onrender.com/addNewBus", {
            Bus_Number: newBusNo,
            Driver_Name: newDriverName,
            Driver_Contact: newDriverContact,
            Area: selectedArea,
            Start_Point: newStartPoint,
            End_Point: newEndPoint
        })
        if (response.data.message === "Success") {
            toast.success("New Bus Added Successfully!")
        }
        else {
            toast.error("Failed to Add New Bus!")
        }
        setShow(false)
        setSelectedArea('')

    }
    useEffect(() => {
        axios.get('https://putms.onrender.com/all-Buses')
            .then(bus => setBusData(bus.data))
            .catch(err => console.log(err))
    },[])

    async function RemoveBus(bus_number) {
        let response = await axios.post("https://putms.onrender.com/removeBus", { bus_number })
        toast.success(response.data.message)
    }

    function ViewRoute() {
        toast.error("This feature is still in development!")
    }



    return (
        <>
            <AdminSidebar />
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
                                                <td className='w-[10%]'>{index + 1}</td>
                                                <td className='w-[10%]'>{bus.Bus_Number}</td>
                                                <td className='w-[10%]'>{bus.Driver_Name}</td>
                                                <td className='w-[10%]'>{bus.Driver_Contact}</td>
                                                <td className='w-[10%]'>{bus.Area}</td>
                                                <td className='w-[10%]'>{bus.Start_Point}</td>
                                                <td className='w-[10%]'>{bus.End_Point}</td>
                                                <td className='w-[20%]'><button className='bg-green-600 px-2 py-1 rounded-md hover:bg-green-800 transition ease-in-out' onClick={ViewRoute}>View Route</button> <button className='bg-red-500 px-2 py-1 rounded-md hover:bg-red-800 transition ease-in-out' onClick={() => {
                                                    RemoveBus(bus.Bus_Number)
                                                }}>Remove Bus</button></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>

                    </div>
                    <div className='flex justify-end mr-5'>
                        <button className='bg-blue-500 p-2 w-[7rem] text-white flex items-center justify-center rounded-lg hover:bg-blue-700' onClick={handleShow}><FaPlus className='mr-2' />Add Bus</button>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} className='overflow-visible'>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Buss</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='flex flex-col space-y-2 p-4 bg-gray-200 rounded-md'>
                        <input type="text" name="BusNo" id="BusNo" placeholder="Enter Bus Number" className='p-2 rounded-md border border-black' autoFocus autoComplete='off' onChange={(e) => setNewBusNo(e.target.value)} />
                        <input type="text" name="Designation" id="Designation" placeholder="Enter Driver Name" className='p-2 rounded-md border border-black' autoComplete='off' onChange={(e) => setNewDriverName(e.target.value)} />
                        <input type="text" name="ID" id="ID" placeholder="Enter Driver Contact" className='p-2 rounded-md border border-black' autoComplete='off' onChange={(e) => setNewDriverContact(e.target.value)} />
                        <Form.Select className='border border-black' onChange={handleSelectChange} value={selectedArea}>
                            <option value="">Select Area</option>
                            <option value="AREA-01">AREA-01</option>
                            <option value="AREA-02">AREA-02</option>
                            <option value="AREA-03">AREA-03</option>
                            <option value="AREA-04">AREA-04</option>
                            <option value="AREA-05">AREA-05</option>
                            <option value="AREA-06">AREA-06</option>
                            <option value="AREA-07">AREA-07</option>
                        </Form.Select>
                        <input type="text" name="Department" id="Department" placeholder="Enter Start Point" className='p-2 rounded-md border border-black' autoComplete='off' onChange={(e) => setNewStartPoint(e.target.value)} />
                        <input type="text" name="Mobile" id="Mobile" placeholder="Enter End Point" className='p-2 rounded-md border border-black' autoComplete='off' onChange={(e) => setNewEndPoint(e.target.value)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleAddNewBus();
                    }}>
                        Add Bus
                    </Button>
                </Modal.Footer>
            </Modal >
            <Footer />
        </>
    )
}
