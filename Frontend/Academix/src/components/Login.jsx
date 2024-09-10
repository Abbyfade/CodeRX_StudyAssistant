import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
// import axios from 'axios'
import xbutton from '../assets/xbutton.png'

export const Login = () => {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleUserName = (e) => {
        setUserName(e.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    //Details from the form to be submitted
    // const userInfo = {
    //     email: email,
    //     password: password
    // }

  return (
    //Page Contents
    <div className='flex justify-center mx-auto w-screen h-screen items-center login-bg'>
        <div className='w-[60%] mx-auto bg-white shadow-[0_4px_50px_1px_rgba(0,0,0,0.25)] px-16 py-12 text-left items-center rounded-lg'>
            <div className='text-5xl font-semibold flex justify-between'>
                <h2>Login</h2>
                <div><Link to='/'><img src={xbutton} alt="" /></Link></div>
            </div>

            <div>
                <div>
                    <input autoFocus className='mt-12 border-b-[1px] border-b-black border-solid outline-none py-[10px] w-full' type="text" name="username" id="username" placeholder='E-mail or Username' value={userName} onChange={handleUserName}/>
                </div>
                <div>
                    <input className='mt-10 border-b-[1px] border-b-black border-solid outline-none py-[10px] w-full' type="password" name="password" id="password" placeholder='Password' value={password} onChange={handlePassword}/>
                </div>

                <div className='mt-10 text-center'>
                    <button className='bg-[#183F55] px-6 py-2 text-white text-xl font-medium rounded-lg hover:shadow-[0_4px_50px_1px_rgba(0,0,0,0.25)]'>Login</button>
                    <p className='mt-2'>New Account? <Link to='/signup' className='underline text-[#3B9DD4]'>Register</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}