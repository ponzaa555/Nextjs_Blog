"use client";
import BlogTableItem from '@/components/adminComponent/BlogTableItem';
import { Blog } from '@prisma/client';
import axios from 'axios';
import { it } from 'node:test';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
    const [blogs,setBlogs] = useState<Array<Blog>>([]);

    const fetchBlogs = async() =>{
        const res = await axios.get('/api/blog');
        console.log("res : ",res.data.Blogs)
        setBlogs(res.data.Blogs)
    }

    const deleteBlog = async(mongoId:string) =>{
        const res = await axios.delete('/api/blog',{params:{
            id:mongoId
        }})
        console.log(res)
        fetchBlogs()
        toast.success(res.data.msg)
    }

    useEffect(() =>{
        fetchBlogs();
    },[])
    return (
        <div className=' flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
            <h1>All Blogs</h1>
            <div className=' relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
                <table className=' w-full text-sm text-gray-500'>
                    <thead className='text-sm text text-gray-700 text-left uppercase bg-gray-50'>
                        <tr>
                            <th scope='col' className=' hidden sm:block px-6 py-3'>
                                Author name
                            </th>
                            <th scope='col' className='  px-6 py-3'>
                                Blog Title
                            </th>
                            <th scope='col' className='  px-6 py-3'>
                                Date
                            </th>
                            <th scope='col' className='  px-6 py-3'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((item,index) => {
                            return  <BlogTableItem  key={index} authorImg={item.authorImg} title={item.title} authorName={item.author} date={item.date.toString()} deletBlog={deleteBlog} mongoId = {item.id}/>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Page;
