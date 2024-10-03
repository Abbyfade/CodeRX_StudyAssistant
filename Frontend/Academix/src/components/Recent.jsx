import React, { useState, useEffect } from 'react';
import profpic from '../assets/profpic.png';
import { Link, NavLink, useOutletContext } from 'react-router-dom';
import axios from 'axios'
import { parseISO, format } from 'date-fns';

export const Recent = () => {
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setSidebarOpen } = useOutletContext()


  const fetchData = async () => {
    try {
      const [userResponse, recentsResponse] = await Promise.all([ axios.get('http://16.171.33.87:8000/api/user_detail/', {
        withCredentials: true,
        headers: {
          "Authorization":'Token ' + localStorage.getItem('token'),
        },
        
      }), axios.get('http://16.171.33.87:8000/api/user_questions/', {
        withCredentials: true,
        headers: {
          "Authorization": "Token " + localStorage.getItem('token'),
        },
        
      }) ]);
        setUser(userResponse.data);

        setActivity(recentsResponse.data);

        setLoading(false); 
    } catch (error) {
        setError(error);
        setLoading(false); // 
    }
  };

  //fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return( 
      <>
        <div className='flex justify-between lg:justify-end items-center'>
          {/* Left Side */}
          <div className=" lg:hidden" onClick={() => setSidebarOpen(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
            </svg>
          </div>
          {/* Right Side */}
          <div className='flex justify-center items-center gap-4'>
            <div className='flex items-center gap-2 bg-[#DAF2FF] w-fit py-2 px-2 rounded-2xl text-base lg:text-xl font-semibold'>
              <img src={profpic} className=' w-6 lg:w-full' alt='user' /> 
              <p>{user?.username}</p>
            </div>
            <div>
              <NavLink to='/user/generate' className='py-2 px-2 bg-[#0E2633] text-white rounded-xl text-base md:text-xl lg:text-2xl'>Generate</NavLink>
            </div>
          </div>  
        </div>
        <p className="text-center text-xl py-6 mt-10">Loading</p>
      </>
    )
  }

  if (error) {
    return( 
            <>
              <div className='flex justify-between lg:justify-end items-center'>
                {/* Left Side */}
                <div className=" lg:hidden" onClick={() => setSidebarOpen(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                  </svg>
                </div>
                {/* Right Side */}
                <div className='flex justify-center items-center gap-4'>
                  <div className='flex items-center gap-2 bg-[#DAF2FF] w-fit py-2 px-2 rounded-2xl text-base lg:text-xl font-semibold'>
                    <img src={profpic} className=' w-6 lg:w-full' alt='user' /> 
                    <p>{user?.username}</p>
                  </div>
                  <div>
                    <NavLink to='/user/generate' className='py-2 px-2 bg-[#0E2633] text-white rounded-xl text-base md:text-xl lg:text-2xl'>Generate</NavLink>
                  </div>
                </div>  
              </div>
              <p className="text-center text-xl py-6 mt-10">Failed to load data. Please try again.</p>
            </>
    ) // Error state
  }

  return (
    <div className='font-Inter text-[#313131]'>
      {/* User profile and navigation */}
      <div className='flex justify-between lg:justify-end items-center'>
        {/* Left Side */}
        <div className=" lg:hidden" onClick={() => setSidebarOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </div>
        {/* Right Side */}
        <div className='flex justify-center items-center gap-4'>
          <div className='flex items-center gap-2 bg-[#DAF2FF] w-fit py-2 px-2 rounded-2xl text-base lg:text-xl font-semibold'>
            <img src={profpic} className=' w-6 lg:w-full' alt='user' /> 
            <p>{user?.username}</p>
          </div>
          <div>
            <NavLink to='/user/generate' className='py-2 px-2 bg-[#0E2633] text-white rounded-xl text-base md:text-xl lg:text-2xl'>Generate</NavLink>
          </div>
        </div>  
      </div>

      {/* Welcome message */}
      <div className='mt-10 font-semibold'>
        <h2 className='lg:text-2xl text-xl '>Welcome, {user?.username}</h2>
      </div>

      {/* Recent Activity */}
      <div className='mt-10 font-semibold'>
        <h2 className=' text-2xl lg:text-4xl pb-4 border-b border-opacity-20 border-solid border-b-black'>Your Recent Activity</h2>
      </div>

      {/* Render recent activity or show "Nothing to see here" if no data */}
      <div>
        {activity && activity.questions && activity.questions.length === 0 ? (
          <p className='text-center text-xl py-6'>Nothing to see here</p>
        ) : (
          activity && activity.questions && activity.questions.slice(0 , 5).map(item => (
            <Link to={`/user/questiondetails/${item.id}`} key={item.id} className='flex justify-between items-center py-4 lg:px-6 border-b border-solid border-black border-opacity-20'>
              <div className='grid grid-cols-5 lg:grid-cols-3 lg:justify-between w-full items-center'>
                <p className='text-base lg:text-xl font-semibold text-[#313131] col-span-2 lg:col-span-1'>{item.question_name}</p>
                <p className='bg-[#daf2ff] py-2 px-2 text-sm lg:text-base lg:px-3 w-fit rounded-xl col-span-2 lg:col-span-1 text-center'>{item.category}</p>
                <div className='col-span-1 text-sm lg:text-lg rounded-lg text-center'>{format(parseISO(item.date_created), 'MMM d')}</div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
