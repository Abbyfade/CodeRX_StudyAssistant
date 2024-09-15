import React from 'react';
import profpic from '../assets/profpic.png';
import { NavLink, useOutletContext } from 'react-router-dom'; // Import useLocation to track route changes

export const Userandgen = () => {
  const { user } = useOutletContext()


  return (
    <div>
      <div className='flex justify-end items-center gap-4'>
        {/* Display user details */}
        <div className='flex items-center gap-2 bg-[#DAF2FF] w-fit py-2 px-2 rounded-2xl text-xl font-semibold'>
          <img src={profpic} alt='user' />
          <p>{user || 'Loading...'}</p> {/* Show 'Loading...' while the user data is being fetched */}
        </div>
        {/* Generate button */}
        <div>
          <NavLink to='/user/generate' className='py-2 px-5 bg-[#0E2633] text-white rounded-xl text-2xl'>
            Generate
          </NavLink>
        </div>
      </div>
    </div>
  );
};
