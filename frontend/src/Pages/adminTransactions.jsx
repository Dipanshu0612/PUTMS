import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../components/footer'
import { FaMoneyCheckDollar } from 'react-icons/fa6'
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

export default function AdminTransactions() {
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(false);

    async function getTransactions(){
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
      getTransactions();
      },[])
  return (
    <>
    {loading && <Spinner />}
    <AdminSidebar />
    <div className='bg-slate-200 p-3'>
        <div className='flex flex-col bg-white p-3 shadow-lg'>
          <div className='flex space-x-2 text-center items-center text-blue-500'>
            <div className=''>
              <FaMoneyCheckDollar className='text-3xl mb-2' />
            </div>
            <h4 className='text-center font-semibold'>ALL TRANSACTIONS</h4>
          </div>
          <div className='h-[0.1rem] bg-slate-200 w-[100%] mb-3'></div>

          <div>
            <Table striped bordered responsive hover variant="dark" className='text-center cursor-pointer'>
              <thead>
                <tr>
                  <th className='w-25'>Sr. No</th>
                  <th className='w-25'>User Name</th>
                  <th className='w-25'>Enrollment / MIS_ID</th>
                  <th className='w-25'>Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {userData.filter(user => user.Bus_Fees_Paid === "Yes").map((user,index) => {
                  return (
                    <tr>
                      <td className='w-25'>{index + 1}</td>
                      <td className='w-25'>{user.Name}</td>
                      <td className='w-25'>{user.Enrollment || user.MIS_ID}</td>
                      <td className='w-25'>{user.transaction_id}</td>
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
