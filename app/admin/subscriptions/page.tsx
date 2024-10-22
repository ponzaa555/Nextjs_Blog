"use client";
import Subtable from '@/components/adminComponent/Subtable';
import { Subscibe } from '@prisma/client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {

    const [emails , setEmails] = useState<Subscibe[]>([]);

    const fetchEmails = async () => { 
        try{
            const res = await axios.get("/api/email")
            console.log(res)
            setEmails(res.data.emails)
        }catch(err){
            console.log(err)
        }
    }

    const deleteSubscribe =  async (mongoId :string) =>{
        try{
            const res = await axios.delete("/api/email",{
                params:{
                    id:mongoId
                }
            })
            toast.success(res.data.msg)
            fetchEmails()
        }catch(err){
            toast.error("Can't Delete")
            console.log(err)
        }
    }
    
    useEffect(() =>{
        fetchEmails()
    },[])
    return (
        <div className=' flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>All Subscribtion</h1>
            <div className=' relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className=' w-full text-sm text-gray-500'>
                    {/* thead = col name of table */}
                    <thead className=' text-xs font-semibold text-left text-gray-700 uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className='px-6 py-3'>Email Subscribtion</th>
                            <th scope='col' className=' hidden sm:block px-6 py-3'>Date</th>
                            <th scope='col' className='px-6 py-3'>Action</th>
                        </tr>
                    </thead>
                    {/* Body of table */}
                    <tbody>
                        {emails.map((item,index) =>{
                            return <Subtable key={index} email={item.email} id={item.id} date={item.date} deletemail = {deleteSubscribe}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Page;
