import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import xbutton from '../assets/xbutton.png'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleemail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    // Details from the form to be submitted
    const userInfo = {
        email: email,
        password: password
    }

    const url = 'https://c5f0-13-60-211-71.ngrok-free.app/api/login/'
    const navigate = useNavigate()
    

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.post(url, userInfo, 
                {withCredentials: true}
            )
            localStorage.setItem('token', response.data.token)
            console.log(response.data.token);
            navigate('/user/home')
            
        } catch (error) {
            console.log(error);
        }
    }

  return (
    //Page Contents
    <div className='flex justify-center mx-auto w-screen h-screen items-center login-bg'>
        <div className='md:w-[60%] w-[95%] mx-auto bg-white shadow-[0_4px_50px_1px_rgba(0,0,0,0.25)] md:px-16 px-6 py-12 text-left items-center rounded-lg'>
            <div className='text-5xl font-semibold flex justify-between'>
                <h2>Login</h2>
                <div><Link to='/'><img src={xbutton} alt="" /></Link></div>
            </div>

            <div>
                <div>
                    <input autoFocus className='mt-12 border-b-[1px] border-b-black border-solid outline-none py-[10px] w-full' type="email" name="email" id="email" placeholder='E-mail' value={email} onChange={handleemail}/>
                </div>
                <div>
                    <input className='mt-10 border-b-[1px] border-b-black border-solid outline-none py-[10px] w-full' type="password" name="password" id="password" placeholder='Password' value={password} onChange={handlePassword}/>
                </div>

                <div className='mt-10 text-center'>
                    <button className='bg-[#183F55] px-6 py-2 text-white text-xl font-medium rounded-lg hover:shadow-[0_4px_50px_1px_rgba(0,0,0,0.25)]' onClick={handleSubmit}>Login</button>
                    <p className='mt-2'>New Account? <Link to='/signup' className='underline text-[#3B9DD4]'>Register</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}