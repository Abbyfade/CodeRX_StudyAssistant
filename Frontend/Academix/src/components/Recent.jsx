import React, { useState, useEffect } from 'react';
import profpic from '../assets/profpic.png';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios'
import { parseISO, format } from 'date-fns';

export const Recent = () => {
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchData = async () => {
    try {
      const [userResponse, recentsResponse] = await Promise.all([ axios.get('http://16.171.33.87:3000/api/user_detail/', {
        withCredentials: true,
        headers: {
          "Authorization":'Token ' + localStorage.getItem('token'),
        },
        
      }), axios.get('http://16.171.33.87:3000/api/user_questions/', {
        withCredentials: true,
        headers: {
          "Authorization": "Token " + localStorage.getItem('token'),
        },
        
      }) ]);
        setUser(userResponse.data);
        // console.log(userResponse);

        setActivity(recentsResponse.data);
        // console.log(recentsResponse);

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
  // console.log( 'This is activity: ' + activity);
  // console.log(activity)

  if (loading) {
    return <p className="text-center text-xl py-6">Loading...</p>; // Loading state
  }

  if (error) {
    return <p className="text-center text-xl py-6">Failed to load data. Please try again.</p>; // Error state
  }

  return (
    <div className='font-Inter text-[#313131]'>
      {/* User profile and navigation */}
      <div className='flex justify-end items-center gap-4'>
        <div className='flex items-center gap-2 bg-[#DAF2FF] w-fit py-2 px-2 rounded-2xl text-xl font-semibold'>
          <img src={profpic} alt='user' /> 
          <p>{user?.username}</p> {/* Show username dynamically */}
        </div>
        <div>
          <NavLink to='/user/generate' className='py-2 px-5 bg-[#0E2633] text-white rounded-xl text-2xl'>Generate</NavLink>
        </div>
      </div>

      {/* Welcome message */}
      <div className='mt-10 font-semibold'>
        <h2 className='text-2xl'>Welcome, {user?.username}</h2>
      </div>

      {/* Recent Activity */}
      <div className='mt-10 font-semibold'>
        <h2 className='text-4xl pb-4 border-b border-opacity-20 border-solid border-b-black'>Your Recent Activity</h2>
      </div>

      {/* Render recent activity or show "Nothing to see here" if no data */}
      <div>
        {activity && activity.questions && activity.questions.length === 0 ? (
          <p className='text-center text-xl py-6'>Nothing to see here</p>
        ) : (
          activity && activity.questions && activity.questions.slice(0 , 5).map(item => (
            <Link to={`/user/questiondetails/${item.id}`} key={item.id} className='flex justify-between items-center py-4 px-6 border-b border-solid border-black border-opacity-20'>
              <div className='flex gap-6 items-center'>
                <p className='text-xl font-semibold text-[#313131]'>{item.question_name}</p>
                <p className='bg-[#daf2ff] py-2 px-5 rounded-md'>{item.category}</p>
              </div>
              <div className='text-lg rounded-lg'>{format(parseISO(item.date_created), 'MMM d')}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
