import React from 'react'
import {FaSquareWhatsapp} from "react-icons/fa6"
import {FaGithubSquare,FaInstagramSquare,FaLinkedin} from "react-icons/fa"

export default function Footer() {
  return (
    <>
    <div className='h-[20rem] bg-gray-800 flex flex-col flex-wrap justify-center items-center text-white space-y-5 mb-1'>
        <p> Copyright &copy; 2024 | All Rights Reserved</p>
        <h2>PU Transport Management System</h2>
        
        <div className='h-[0.05rem] bg-white w-[90%]'></div>

        <div className='flex justify-around items-center space-x-10 text-center cursor-pointer'>
            <div>
                <h4 classname="font-bold">Dipanshu Mishra</h4>
                <p>Full Stack Developer</p>
                <div className='flex justify-around items-center text-4xl mt-3 space-x-3 '>
                <a href="https://www.linkedin.com/in/dipanshu-mishra-696a0622a" className='text-white hover:text-blue-600 transition-all'><FaLinkedin /></a>
                <a href="https://github.com/Dipanshu0612" className='text-white hover:text-yellow-600 transition-all'><FaGithubSquare /></a>
                <a href="https://api.whatsapp.com/send?phone=918485974624&text=Hello, more information!"
             className='text-white hover:text-yellow-600 transition-all'><FaSquareWhatsapp /></a>
                <a href="https://www.instagram.com/_.dipanshu._06/" className='text-white hover:text-yellow-600 transition-all'><FaInstagramSquare /></a>
                </div>
            </div>
            <div>
                <h4 classname="font-bold">Aman Jain</h4>
                <p>Full Stack Developer</p>
                <div className='flex justify-around items-center text-4xl mt-3 space-x-3 '>
                <a href="https://www.linkedin.com/in/arsh-quadri-60994b243/" className='text-white hover:text-yellow-600 transition-all'><FaLinkedin /></a>
                <a href="https://github.com/Arsh-Quadri" className='text-white hover:text-yellow-600 transition-all'><FaGithubSquare /></a>
                <a href="https://api.whatsapp.com/send?phone=919429091481&text=Hello, more information!"
             className='text-white hover:text-yellow-600 transition-all'><FaSquareWhatsapp /></a>
                <a href="https://www.instagram.com/_.dipanshu._06/" className='text-white hover:text-yellow-600 transition-all'><FaInstagramSquare /></a>
                </div>
            </div>
            <div>
                <h4 classname="font-bold">Annu Manikpuri</h4>
                <p>Full Stack Developer</p>
                <div className='flex justify-around items-center text-4xl mt-3 space-x-3 '>
                <a href="https://www.linkedin.com/in/khushal-dave-b11438253/" className='text-white hover:text-yellow-600 transition-all'><FaLinkedin /></a>
                <a href="https://github.com/Khushall-7" className='text-white hover:text-yellow-600 transition-all'><FaGithubSquare /></a>
                <a href="https://api.whatsapp.com/send?phone=918866615069&text=Hello, more information!"
             className='text-white hover:text-yellow-600 transition-all'><FaSquareWhatsapp /></a>
                <a href="https://www.instagram.com/_.dipanshu._06/" className='text-white hover:text-yellow-600 transition-all'><FaInstagramSquare /></a>
                </div>
            </div>
            <div>
                <h4 classname="font-bold">Siddhi Odedra</h4>
                <p>Full Stack Developer</p>
                <div className='flex justify-around items-center text-4xl mt-3 space-x-3 '>
                <a href="https://www.linkedin.com/in/ved-thakar/" className='text-white hover:text-yellow-600 transition-all'><FaLinkedin /></a>
                <a href="https://github.com/turntved" className='text-white hover:text-yellow-600 transition-all'><FaGithubSquare /></a>
                <a href="https://api.whatsapp.com/send?phone=916355543672&text=Hello, more information!"
             className='text-white hover:text-yellow-600 transition-all'><FaSquareWhatsapp /></a>
                <a href="https://www.instagram.com/_.dipanshu._06/" className='text-white hover:text-yellow-600 transition-all'><FaInstagramSquare /></a>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}
