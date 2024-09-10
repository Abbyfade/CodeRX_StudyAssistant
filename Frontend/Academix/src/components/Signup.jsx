import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import xbutton from '../assets/xbutton.png'

export const Signup = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')

    const handleName = (e) =>{
        setName(e.target.value)
    }

    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePhone = (e) => {
        setPhone(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleConfirm = (e) => {
        setConfirm(e.target.value)
    }

    //Details from the form to be submitted
    // const userInfo = {
    //     name: name,
    //     username: username,
    //     phone: phone,
    //     password: password,
    //     confirm: confirm
    // }

  return (
    //Page Content
    <div className='flex items-center justify-center mx-auto h-screen w-screen py-8'>
        <div className='w-[60%] mx-auto bg-white shadow-[0_4px_50px_1px_rgba(0,0,0,0.25)] px-16 py-12 text-left items-center rounded-lg'>
            <div className='text-5xl font-semibold flex justify-between'>
                <h2>Register</h2>
                <div><Link to='/'><img src={xbutton} alt="" /></Link></div>
            </div>
            <div>
                <div>
                    <input autoFocus className='mt-12 border-b-[1px] border-b-black border-solid outline-none py-[10px] w-full' type="text" name="name" id="name" placeholder='Name' value={name} onChange={handleName} />
                </div>

                <div>
                    <input className='mt-8 border-b-[1px] border-b-black border-solid outline-none py-[10px] w-full' type="text" name="username" id="username" placeholder='Username' value={username} onChange={handleUsername} />
                </div>
                <div>
                    <input className='mt-8 border-b-[1px] border-b-black border-solid outline-none py-[10px] w-full' type="number" name="phone" id='phone' placeholder='Phone No.' value={phone} onChange={handlePhone}/>
                </div>
                <div>
                    <input className='mt-8 border-b-[1px] border-b-black border-solid outline-none py-[10px] w-full' type="password" name='password' id='password' placeholder='Password' value={password} onChange={handlePassword}/>
                </div>
                <div>
                    <input className='mt-8 border-b-[1px] border-b-black border-solid outline-none py-[10px] w-full' type="password" name='confirm' id='confirm' placeholder='Confirm Password' value={confirm} onChange={handleConfirm}/>
                </div>

                <div className='mt-10 text-center'>
                    <button className='bg-[#313131] px-6 py-2 text-white text-xl font-medium rounded-lg hover:shadow-[0_4px_50px_1px_rgba(0,0,0,0.25)]'>Sign Up</button>
                    <p className='mt-2'>Already have an account? <Link to="/login" className='underline text-[#3B9DD4]'>Log In</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}