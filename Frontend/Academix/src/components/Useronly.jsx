import React from 'react';
import profpic from '../assets/profpic.png';
import { useOutletContext } from 'react-router-dom'; // Import useLocation to track route changes


export const Useronly = () => {

  const { user } = useOutletContext()
  return (
    <div>
        <div className='flex justify-end items-center gap-4'>
            <div className='flex items-center gap-2 bg-[#DAF2FF] w-fit py-2 px-2 rounded-2xl text-xl font-semibold'><img src={profpic} alt='user'/> <p>{user || 'User'}</p></div>
        </div>
    </div>
  )
}
