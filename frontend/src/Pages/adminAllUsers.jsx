import React, { useEffect, useState } from 'react'
import Footer from '../components/footer'
import { FaPlus, FaUsers } from 'react-icons/fa6'
import Table from 'react-bootstrap/esm/Table'
import axios from 'axios'
import { toast } from 'react-toastify'
import Admin_Sidebar from '../components/Admin_Sidebar'

export default function AdminAllUsers() {
  const [user_data, setUserData] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/all-users')
      .then(user => setUserData(user.data))
      .catch(err => console.log(err))
  })

  async function RemoveUser(Mobile) {
    let response = await axios.post("http://localhost:3001/removeUser", { Mobile })
    console.log(response.data)
  }

  function ViewUser() {
    toast.error("This feature is still in development!")
  }
  return (
    <>
    <Admin_Sidebar /> 
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
                        <td><button className='bg-green-600 px-2 py-1 rounded-md hover:bg-green-800 transition ease-in-out' onClick={ViewUser}>View User</button> <button className='bg-red-500 px-2 py-1 rounded-md hover:bg-red-800 transition ease-in-out' onClick={() => {
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
                    <button className='bg-blue-500 p-2 w-[7rem] text-white flex items-center justify-center rounded-lg hover:bg-blue-700'><FaPlus className='mr-2'/>Add User</button>
                    </div>
      </div>
      </div>
      <Footer/>
    </>
  )
}
