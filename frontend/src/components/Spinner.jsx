import React from 'react'
import { Hourglass } from 'react-loader-spinner'
import "../index.css"

export default function Spinner() {
  return (
    <>
    <div className='spinner fixed w-100 h-[100vh] flex items-center justify-center z-2'>
    <Hourglass
  visible={true}
  height="100vh"
  width="100"
  ariaLabel="hourglass-loading"
  wrapperStyle={{}}
  wrapperClass="absolute flex-1"
  colors={['#306cce', '#72a1ed']}
  />
  </div>
    </>
  )
}
