import React from 'react'
import splash from '../assets/academix_pro.png'
import { Link } from 'react-router-dom'
import down from '../assets/downdown.png'
import behind from '../assets/behind.png'
import sshot from '../assets/sshot.png'

export const Landing = () => {
  return (
    <div className='font-Inter'>
      {/* Top Nav */}
      <div className='w-[80%] mx-auto flex justify-between pt-6'>
          <div>
            <img src={splash} className='w-28' alt="" />
          </div>

          <div className='flex gap-10'>
            <Link to='/signup' className='bg-[#0E2633] text-white h-fit px-5 py-2 rounded-lg font-semibold'>Sign Up</Link>
            <Link to='/login' className='text-[#0E2633] bg-white h-fit px-6 py-2 border-2 border-solid border-[#0E2633] rounded-lg font-semibold'>Login</Link>
          </div>
      </div>

      <div className='grid grid-cols-2 justify-between mt-2'>
        {/* Left side */}
        <div className=' h-[100vh] items-center col-span-1 w-7/12'>
          <h2 className='text-4xl font-semibold'>Convert Lecture Notes to Practice Questions Instantly</h2>
          <p>Transform your lecture notes into custom practice questions that enhance retention, deepen understanding, and help you ace your exams with targeted, effective study sessions tailored just for you.</p>
          <div className='flex gap-6'>
            <Link to='/signup' className='bg-[#0E2633] text-white h-fit px-5 py-2 rounded-lg font-semibold'>Sign Up</Link>
            <Link to='/login' className='text-[#0E2633] bg-white h-fit px-6 py-2 border-2 border-solid border-[#0E2633] rounded-lg font-semibold'>Login</Link>
          </div>
        </div>

        {/* Right Side */}
        <div className='w-1/2 flex justify-items-end col-span-1 h-screen'>
          <div className='items-center'><img src={sshot} alt="" /></div>
        </div>
      </div>
    </div>
  )
}
