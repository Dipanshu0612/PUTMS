import React, { useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import Footer from '../components/footer'
import { AiOutlineNotification } from 'react-icons/ai'
import "../index.css"
import axios from 'axios'
import { toast } from 'react-toastify'

export default function PushNotification() {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const postNotification = async () => {
        let response = await axios.post('http://localhost:3001/push_notification', { title, message });
        if (response.data.success) {
            toast.success(response.data.message)
        }
        else {
            toast.error(response.data.message)
    }
}
    return (
        <>
            <AdminSidebar />
            <div className='bg-slate-200'>
                <div className='bg-slate-200 p-3 m-2 space-y-5 flex flex-col'>
                    <div className='flex flex-col bg-white p-3 shadow-lg m-3'>
                        <div className='flex space-x-2 text-center items-center text-blue-500'>
                            <div className=''>
                                <AiOutlineNotification className='text-3xl mb-2' />
                            </div>
                            <h4 className='text-center font-semibold'>PUSH NOTIFICATION</h4>
                        </div>

                        <div className='h-[0.1rem] bg-slate-200 w-[100%] mb-3'></div>

                        <div className='flex flex-col'>
                            <div className='flex flex-col space-y-2'>
                                <input type="text" name="title" id="title" className='p-2 border-2 border-gray-300 rounded-md' placeholder='Enter Title' onChange={(e)=>setTitle(e.target.value)}/>
                                <textarea name="message" id="message" cols="30" rows="8" className='p-2 border-2 border-gray-300 rounded-md' placeholder='Enter the message' onChange={(e)=>setMessage(e.target.value)}></textarea>
                                <button className='bg-blue-500 p-2 w-max text-white flex items-center justify-center rounded-lg hover:bg-blue-700' onClick={postNotification}>Post Notification</button> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
