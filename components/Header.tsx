"use client"
import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Header = () => {
    const [email, setEmail] = useState("");

    const onSubmiteHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body = {
            email: email
        }
        try {
            const res = await axios.post("/api/email", body)
            console.log("res : ",res)
            toast.success("Email Subscribe")
            setEmail("")
        }catch(err){
            console.log(err)
            toast.error("error")
        }
    }
    return (
        <div className=' py-5 px-5 md:px-12 lg:px-28'>
            <div className='flex justify-between items-center'>
                <Image src={assets.logo} width={200} alt='' className=' w-[150px]' />
                <button className=' flex  items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>
                    GetStarted <Image src={assets.arrow} />
                </button>
            </div>
            <div className=' text-center my-8'>
                <h1 className=' text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
                <p className='mt-10 max-w-[740px] m-auto text-xs  sm:text-base'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore quo, accusantium tempore perferendis delectus illum asperiores quam debitis temporibus animi vero sint earum dolor vel.</p>
                <form onSubmit={onSubmiteHandler} className=' flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10  border border-black shadow-[-7px_7px_0px_#000000]'>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Enter your email ' className=' pl-4 outline-none' />
                    <button type='submit' className=' border-l border-black px-4 py-4 sm:px-8 active:bg-gray-600 active:text-white'>Subscribe</button>
                </form>
            </div>
        </div>
    );
}

export default Header;
