"use client";
import axios from 'axios';
import { set } from 'mongoose';
import { it } from 'node:test';
import React, { useEffect, useState } from 'react';
import Blog from './Blog';
import Link from 'next/link';


const BlogList = () => {
    const [menu, setMenu] = useState("All");
    const [blog, setBlog] = useState([])

    const fetchBlog = async () => {
        try {
            const response = await axios.get("/api/blog");
            console.log("response : ", response.data);
            setBlog(response.data.Blogs);
        } catch (error) {
            console.log("Can't fetch blog")
        }
    }

    // run fetchBlog everytime this component loaded 
    useEffect(() => {
        fetchBlog()
    }, [])// [] is mean run once when component loaded normaly it will be variable so it will run everytime that value of variable change


    return (
        <div>
            <div className='flex justify-center gap-6 my-10'>
                <button onClick={() => setMenu("All")} className={menu === "All" ? "bg-black text-white px-3 py-2" : ""}>All</button>
                <button onClick={() => setMenu("Tecnology")} className={menu === "Tecnology" ? "bg-black text-white px-3 py-2" : ""}>Tecnology</button>
                <button onClick={() => setMenu("Startup")} className={menu === "Startup" ? "bg-black text-white px-3 py-2" : ""}>Startup</button>
                <button onClick={() => setMenu("Lifestyle")} className={menu === "Lifestyle" ? "bg-black text-white px-3 py-2" : ""}>Lifestyle</button>
            </div>
            {/*  List Blog */}
            <div className=' flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
                {
                    blog.filter((item) => 
                         menu === 'All' ? true : item.category === menu
                    ).map((item, index) => {
                        return (
                            <Link href={`/blog/${item.id}`}>
                                <Blog
                                key={index}
                                id={item.id}
                                category={item.category}
                                title={item.title}
                                description={item.description}
                            />
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default BlogList;
