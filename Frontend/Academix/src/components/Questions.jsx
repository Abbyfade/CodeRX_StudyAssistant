import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Userandgen } from './Userandgen';
import { parseISO, format } from 'date-fns';
import { Link } from 'react-router-dom';

export const Questions = () => {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const recentsResponse = await axios.get('http://16.171.33.87:3000/api/user_questions/', {
        withCredentials: true,
        headers: {
          "Authorization": "Token " + localStorage.getItem('token'),
        },
        
      }) ;


        setActivity(recentsResponse.data);
        // console.log(recentsResponse);

        setLoading(false); 
    } catch (error) {
        setError(error.message);
        setLoading(false); // 
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <p>Loading questions...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='font-Inter text-[#313131]'>
        <Userandgen />
      <h2 className='text-4xl font-semibold mb-4 border-b border-solid pb-2'>Questions</h2>
      <div className="mt-10 font-semibold">
        
        {/* Render recent activity or show "Nothing to see here" if no data */}
      <div>
        {activity && activity.questions && activity.questions.length === 0 ? (
          <p className='text-center text-xl py-6'>Nothing to see here</p>
        ) : (
          activity && activity.questions && activity.questions.map(item => (
            <Link to={'/user/questiondetails/' + item.id} key={item.id} className='flex justify-between items-center py-4 px-6 border-b border-solid border-black border-opacity-20'>
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
    </div>
  );
};
