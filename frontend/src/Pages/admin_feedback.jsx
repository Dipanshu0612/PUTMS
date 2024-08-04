import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar';
import Footer from '../components/footer';
import { VscFeedback } from 'react-icons/vsc';
import axios from 'axios';

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/get_feedback").then((res) => {
      setFeedbacks(res.data);
    });
  }, [feedbacks]);

  return (
    <>
      <AdminSidebar />
      <div className='bg-slate-200'>
        <div className='bg-slate-200 p-3 m-2 space-y-5 flex flex-col'>
          <div className='flex flex-col bg-white p-3 shadow-lg m-3'>
            <div className='flex space-x-2 text-center items-center text-blue-500'>
              <div className=''>
                <VscFeedback className='text-3xl mb-2' />
              </div>
              <h4 className='text-center font-semibold'>USER FEEDBACK</h4>
            </div>

            <div className='h-[0.1rem] bg-slate-200 w-[100%] mb-3'></div>

            <div className='flex flex-col m-0 p-0'>
                {feedbacks.map((feedback,index) => {
                    return (
                        <div className='flex flex-col bg-blue-100 p-3 m-2 shadow-md cursor-pointer'>
                            <h4 className='font-semibold'>{feedback.Name} - ({feedback.ID})</h4>
                            <h5>{feedback.Title}</h5>
                            <h6>{feedback.Feedback}</h6>
                        </div>
                    );
                })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
