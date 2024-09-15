import React, { useState, useEffect } from 'react';
import logo from '../assets/navlogo.png'
import home from '../assets/Home.png'
import help from '../assets/Help.png'
import users from '../assets/Users.png'
import grades from '../assets/Grades.png'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios';

export const Sidenav = () => {
    const navLinkStyles = ({isActive}) => {
        return {
          backgroundColor: isActive ? '#DAF2FF80' : '',
          borderRight: isActive ? '10px solid #0E2633' : ''
        }
      }

      const [user, setUser] = useState(null); 

      const navigate = useNavigate()

    const fetchUserData = async () => {
        try {
        const response = await axios.get('http://16.171.33.87:3000/api/user_detail/', {
            withCredentials: true,
            headers: {
            Authorization: 'Token ' + localStorage.getItem('token'),
            },
        });
        setUser(response.data?.username); 
        } catch (error) {
        console.error('Error fetching user data:', error);
        setUser('User');
        }
      };

      const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
      }

    useEffect(() => {
        fetchUserData(); 
    }, []);

  return (
    <div className='flex h-screen'>
        {/* Sidebar */}
        <div className='w-[15%] bg-white font-Inter shadow-right flex flex-col justify-between z-50 fixed left-0 h-full'>
            {/* Top section */}
            <div>
                <div className='text-center py-4'>
                    <img className='inline-block' src={logo} alt="Academix Pro" />
                </div>

                <NavLink to='home' style={navLinkStyles} className='flex items-center gap-4 pl-8 text-xl text-[#313131] border-opacity-20 py-5 border-b border-solid border-[#313131]'>
                    <img className='w-5 h-5' src={home} alt="Home" />
                    <p>Home</p>
                </NavLink>
                <NavLink to={`/user/questions` || `/questiondetails`} style={navLinkStyles}  className='flex items-center gap-4 pl-8 text-xl text-[#313131] border-opacity-20 py-5 border-b border-solid border-[#313131]'>
                    <img className='w-5 h-5' src={help} alt="Help" />
                    <p>Questions</p>
                </NavLink>
                <div className='flex items-center gap-4 pl-8 text-xl text-[#313131] border-opacity-20 py-5 border-b border-solid border-[#313131]'>
                    <img className='w-5 h-5' src={users} alt="Users" />
                    <p>Friends</p>
                </div>
                <div className='flex items-center gap-4 pl-8 text-xl text-[#313131] border-opacity-20 py-5 border-b border-solid border-[#313131]'>
                    <img className='w-5 h-5' src={grades} alt="Grades" />
                    <p>Test</p>
                </div>
            </div>

            {/* Bottom section for Settings */}
            <div className='flex items-center gap-4 pl-8 text-xl text-[#313131] py-5 cursor-pointer' onClick={handleLogout}>
                <p>Logout</p>
            </div>
        </div>

        {/* Main content */}
        <div className='flex-1 p-8 bg-white w-[85%] absolute right-0'>
            <Outlet context={{ user }} />
        </div>
    </div>
  )
}
