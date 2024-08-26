import React, { useEffect, useState } from 'react'
import Footer from '../components/footer'
import { FaPlus, FaUsers } from 'react-icons/fa6'
import Table from 'react-bootstrap/esm/Table'
import axios from 'axios'
import { toast } from 'react-toastify'
import AdminSidebar from '../components/AdminSidebar'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from '../components/Spinner'


export default function AdminAllUsers() {
  const [show, setShow] = useState(false);
  const [user_data, setUserData] = useState([])
  const [loading, setLoading] = useState(false);
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedShift, setSelectedShift] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserDesignation, setNewUserDesignation] = useState('');
  const [newUserEnrollment, setNewUserEnrollment] = useState('');
  const [newUserDepartment, setNewUserDepartment] = useState('');
  const [newUserMobile, setNewUserMobile] = useState('');
  const [newUserInstitute, setNewUserInstitute] = useState('');
  const [newUserBoard, setNewUserBoard] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };
  const handleSelectChange = (e) => {
    setSelectedArea(e.target.value);
  }
  const handleSelectChange2 = (e) => {
    setSelectedShift(e.target.value);
  }
  async function handleAddNewUser() {
    let response = await axios.post("https://putms.onrender.com/addNewUser", {
      Name: newUserName,
      Designation: newUserDesignation,
      Enrollment: newUserEnrollment,
      Department: newUserDepartment,
      Mobile: newUserMobile,
      Area: selectedArea,
      Shift: selectedShift,
      Institute: newUserInstitute,
      Boarding_Point: newUserBoard
    })
    if (response.data.message === "Success") {
      toast.success("New User Added Successfully!")
    }
    else {
      toast.error("Failed to Add New User!")
    }
    setShow(false)
    setSelectedArea('')
    setSelectedShift('');

  }
  async function getUsers(){
    setLoading(true);
    try {
      let response = await axios.get('https://putms.onrender.com/all-users')
      setUserData(response.data)
    } catch (error) {
      toast.error(error)
    }
    finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getUsers();
  },[])

  async function RemoveUser(Mobile) {
    let response = await axios.post("https://putms.onrender.com/removeUser", { Mobile })
    console.log(response.data)
  }

  function ViewUser() {
    toast.error("This feature is still in development!")
  }



  return (
    <>
    {loading && <Spinner />}
      <AdminSidebar />
      <div className='bg-slate-200'>
        <div className=' bg-slate-200 p-3 m-2 space-y-5 flex flex-col'>
          <div className='flex flex-col bg-white p-3 shadow-lg m-3'>
            <div className='flex space-x-2 text-center items-center text-blue-500'>
              <div className=''>
                <FaUsers className='text-3xl mb-2' />
              </div>
              <h4 className='text-center font-semibold'>ALL USERS INFORMATION</h4>
            </div>
            <div className='h-[0.1rem] bg-slate-200 w-[100%] mb-3'></div>

            <div>
              <Table striped bordered responsive hover variant="dark" className='text-center cursor-pointer'>
                <thead>
                  <tr>
                    <th>Sr. No</th>
                    <th>Name</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Mobile</th>
                    <th>Bus Pass No</th>
                    <th>Area</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {user_data.map((user, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{user.Name}</td>
                        <td>{user.Designation}</td>
                        <td>{user.Department}</td>
                        <td>{user.Mobile}</td>
                        <td>{user.Bus_Pass_No}</td>
                        <td>{user.Area}</td>
                        <td><button className='bg-green-600 px-2 py-1 rounded-md hover:bg-green-800 transition ease-in-out md:m-2 sm:m-2' onClick={ViewUser}>View User</button> <button className='bg-red-500 px-2 py-1 rounded-md hover:bg-red-800 transition ease-in-out' onClick={() => {
                          RemoveUser(user.Mobile)
                          toast.success("User Successfully Removed!")
                        }}>Remove User</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>
          <div className='flex justify-end mr-5'>
            <button className='bg-blue-500 p-2 w-[7rem] text-white flex items-center justify-center rounded-lg hover:bg-blue-700' onClick={handleShow}><FaPlus className='mr-2' />Add User</button>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} className='overflow-scroll'>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='flex flex-col space-y-2 p-4 bg-gray-200 rounded-md overflow-y-scroll'>
            <input type="text" name="Name" id="Name" placeholder="Enter Name" className='p-2 rounded-md border border-black' autoFocus autoComplete='off' onChange={(e) => setNewUserName(e.target.value)} />
            <input type="text" name="Designation" id="Designation" placeholder="Enter Designation" className='p-2 rounded-md border border-black' autoComplete='off' onChange={(e) => setNewUserDesignation(e.target.value)} />
            <input type="text" name="ID" id="ID" placeholder="Enter Enrollment / MIS ID" className='p-2 rounded-md border border-black' autoComplete='off' onChange={(e) => setNewUserEnrollment(e.target.value)} />
            <input type="text" name="Institute" id="Institute" placeholder="Enter Institute Code" className='p-2 rounded-md border border-black' autoComplete='off' onChange={(e) => setNewUserInstitute(e.target.value)} />
            <input type="text" name="Department" id="Department" placeholder="Enter Department" className='p-2 rounded-md border border-black' autoComplete='off' onChange={(e) => setNewUserDepartment(e.target.value)} />
            <input type="text" name="Mobile" id="Mobile" placeholder="Enter Mobile" className='p-2 rounded-md border border-black' autoComplete='off' onChange={(e) => setNewUserMobile(e.target.value)} />
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
            <input type="text" name="Boarding_Point" id="Boarding_Point" placeholder="Enter Boarding Point" className='p-2 rounded-md border border-black' autoComplete='off' onChange={(e) => setNewUserBoard(e.target.value)} />
            <Form.Select className='border border-black' onChange={handleSelectChange2} value={selectedShift}>
              <option value="">Select Shift</option>
              <option>Morning : 07:30 - 14:30</option>
              <option>General : 09:45 - 16:45</option>
            </Form.Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            handleAddNewUser();
          }}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal >
      <Footer />
    </>
  )
}
