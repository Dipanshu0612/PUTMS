import React, { useState } from 'react'
import Header from '../components/header'
import Footer from '../components/footer'
import { AiOutlineNotification } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Feedback() {
    const [title, setTitle] = useState('');
    const [Feedback, setFeedback] = useState('');
    const user_id = sessionStorage.getItem("user_id");

    const postFeedback = async () => {
        let response = await axios.post("https://putms.onrender.com/post_feedback", { user_id, title, Feedback });
        if (response.data.success) {
            toast.success("Feedback Sent Successfully");
            setTitle('');
            setFeedback('');
        } else {
            toast.error("Failed to Send Feedback");
        }
    }
    return (
        <>
            <Header />
            <div className='bg-slate-200'>
                <div className='bg-slate-200 p-3 m-2 space-y-5 flex flex-col'>
                    <div className='flex flex-col bg-white p-3 shadow-lg m-3'>
                        <div className='flex space-x-2 text-center items-center text-blue-500'>
                            <div className=''>
                                <AiOutlineNotification className='text-3xl mb-2' />
                            </div>
                            <h4 className='text-center font-semibold'>FEEDBACK</h4>
                        </div>

                        <div className='h-[0.1rem] bg-slate-200 w-[100%] mb-3'></div>

                        <div className='flex flex-col'>
                            <div className='flex flex-col space-y-2'>
                                <input type="text" name="title" id="title" className='p-2 border-2 border-gray-300 rounded-md' placeholder='Enter Title' onChange={(e) => setTitle(e.target.value)} />
                                <textarea name="Feedback" id="Feedback" cols="30" rows="8" className='p-2 border-2 border-gray-300 rounded-md' placeholder='Enter your feedback' onChange={(e) => setFeedback(e.target.value)}></textarea>
                                <button className='bg-blue-500 p-2 w-max text-white flex items-center justify-center rounded-lg hover:bg-blue-700' onClick={postFeedback}>Send Feedback</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
