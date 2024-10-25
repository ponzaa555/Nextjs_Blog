import { assets } from '@/Assets/assets';
import { format } from 'date-fns';
import { da } from 'date-fns/locale';
import { Date } from 'mongoose';
import Image from 'next/image';
import React from 'react';


// function type (mongoId: string) => Promise<void>
const BlogTableItem = (
    {authorImg,title,authorName,date,deletBlog,mongoId}:
    {authorImg:string,title:string,authorName:string,date:string,deletBlog:(mongoId: string) => Promise<void>,mongoId:string}) => {
    return (
        <tr className=' bg-white border-b'>
            <th scope='row' className=' items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
                <Image src={authorImg?authorImg:'/profile_icon.png'} width={40} height={40} alt=''/>
                <p>{authorName?authorName:"No author"}</p>
            </th>
            <td className='px-6 py-4'>  
                {title?title : "No title"}
            </td>
            <td className='px-6 py-4'>  
                {date?format(date, ' yyyy MMM dd'):"x"}
            </td>
            <td className='px-6 py-4 cursor-pointer' onClick={() => deletBlog(mongoId)}>
                x
            </td>
        </tr >
    );
}

export default BlogTableItem;
