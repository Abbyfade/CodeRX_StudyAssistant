import React from 'react'
import splash from '../assets/academix_pro.png'
import { Link } from 'react-router-dom'

export const Landing = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-[62%] mx-auto text-center'>
        <div className='w-fit mx-auto'><img src={splash} alt="Academix Pro" /></div>
        <div className='w-60 mx-auto h-4 bg-gradient-to-r from-[#47BCFF] to-[#2b7199] mt-7'></div>

          <div className='mt-10 text-center'>
            <Link to='/signup'><button className='bg-[#313131] px-6 py-2 text-white text-xl font-medium rounded-lg hover:shadow-[0_4px_50px_1px_rgba(0,0,0,0.25)]'>Sign Up</button></Link>
            <p className='mt-4'>Already have an account? <Link to="/login" className='underline text-[#3B9DD4]'>Log In</Link></p>
          </div>
      </div>
      
    </div>
  )
}
