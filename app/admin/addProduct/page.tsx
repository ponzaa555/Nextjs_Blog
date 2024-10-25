"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { assets } from '@/Assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const Page = () => {
  const [img, setImg] = useState<Blob | boolean>()
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex",
    authorImg: "/profile_icon.png",
  })

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
    console.log("data: ", data)
  }

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const jsondata = {
      title: data.title,
      description: data.description,
      category: data.category,
      author: "John Doe",
      authorImg: "authorImage.jpg",
      images: data.authorImg, // Assuming `img` is defined elsewhere
    };

    console.log("data", data);

    const res = await axios.post('/api/blog', jsondata);
    // console.log(res)
    if (res.status === 201) {
      toast.success("Success")
      setImg(false)
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "Alex",
        authorImg: "/profile_icon.png",
      })
    } else {
      toast.error("Error")
    }
  }
  return (
    <>
      <form onSubmit={onSubmitHandler} className=' pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className=' text-xl'>Upload thumbnail</p>
        <label htmlFor='image'>
          <Image className=' mt-4' src={!img || typeof img === "boolean" ? assets.upload_area
            : URL.createObjectURL(img as Blob)} width={140} height={70} alt='' />
        </label>
        <input onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setImg(e.target.files[0]);
          }
        }} type='file' id='image' hidden required />
        <p className='text-xl mt-4'>Blog title</p>
        <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type='text' placeholder='Type here ' required />
        <p className='text-xl mt-4'>Blog DESC</p>
        <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' placeholder='Write conten' rows={6} required />
        <p className=' text-xl mt-4'> Blog category</p>
        <select name="category" onChange={onChangeHandler} value={data.category} className=' w-40 mt-4 px-4 py-3 border text-gray-500'>
          <option value="Startup">Startup</option>
          <option value="Tecnology">Tecnology</option>
          <option value="Lifestyle">Liftstyle</option>
        </select>
        <br></br>
        <button type='submit' className=' mt-8 w-40 h-12 bg-black text-white'>ADD</button>
      </form>
    </>
  );
}

export default Page;
