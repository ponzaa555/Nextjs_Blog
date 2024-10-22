"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Blog } from "@prisma/client";
import Image from "next/image";
import { assets } from "@/Assets/assets";
import Footer from "@/components/Footer";
import Link from "next/link";

// Mark this as a client component (if you need client-side functionality)


const BlogPage = ({ params }: { params: { id: string } }) => {
    const [data, setData] = useState<Blog>();  // State to hold blog data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state

    // Function to fetch blog data based on the dynamic ID
    const fetchBlog = async () => {
        try {
            console.log("parmasId :", params.id);
            const res = await axios.get("/api/blog", {
                params: {
                    id: params.id,  // Use the dynamic ID from the URL
                },
            });
            console.log("res : ", res.data.Blog)
            setData(res.data.Blog);  // Assuming the response contains a blog object
        } catch (err) {
            setError("Error fetching blog data");
        } finally {
            setLoading(false);  // Stop loading once data is fetched
        }
    };

    // Fetch blog data when the component mounts
    useEffect(() => {
        fetchBlog();
    }, [params.id]);  // Re-fetch data when `params.id` changes

    // Show loading state
    if (loading) return <div>Loading...</div>;

    // Show error state
    if (error) return <div>{error}</div>;

    // Show blog content
    return (
        <>
            <div className=" bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
                <div className=" flex justify-between items-center">
                    <Link href = '/'>
                        <Image src={assets.logo} width={180} alt=" " className="w-[130px] " />
                    </Link>
                    <button className=" flex items-center gap-2 font-medium py-1 px-3  sm:py-3 sm:px-6  border border-black shadow-[-7px_7px_0px_#000000]">
                        Get started <Image src={assets.arrow} />
                    </button>
                </div>
                <div className=" text-center my-24 ">
                    <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data?.title}</h1>
                    <Image className=" mx-auto mt-6 border border-white rounded-full" src={assets.profile_icon} width={60} height={60} alt="" />
                    <p className=" mt-1 pb-2 text-lg max-w-[740px] mx-auto ">{data?.author}</p>
                </div>
            </div>
            <div className=" mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10 ">
                <Image className="  border-4 border-white" src={data?.images} width={1280} height={720} alt="" layout="fixed" />
                <h1 className="my-8 text-[26px] font-semibold">Introduction:</h1>

                <div className="blog-content" dangerouslySetInnerHTML={{__html:data?.description}}></div>
                <h3 className="my-5 text-[18px] font-semibold"> Step 1: Self-Reflection and Goal</h3>
                <p className=" my-3 "> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad aliquid ullam voluptatibus et nihil quae saepe earum harum delectus.</p>
                <p className=" my-3 "> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad aliquid ullam voluptatibus et nihil quae saepe earum harum delectus.</p>

                <h3 className="my-5 text-[18px] font-semibold"> Step 2: Self-Reflection and Goal</h3>
                <p className=" my-3 "> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad aliquid ullam voluptatibus et nihil quae saepe earum harum delectus.</p>
                <p className=" my-3 "> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad aliquid ullam voluptatibus et nihil quae saepe earum harum delectus.</p>

                <h3 className="my-5 text-[18px] font-semibold"> Step 3: Self-Reflection and Goal</h3>
                <p className=" my-3 "> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad aliquid ullam voluptatibus et nihil quae saepe earum harum delectus.</p>
                <p className=" my-3 "> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ad aliquid ullam voluptatibus et nihil quae saepe earum harum delectus.</p>

                <h3 className="my-5 text-[18px] font-semibold">Conclusion: </h3>
                <p className="my-3 ">Manage your life style is a journey that requires </p>

                <div className=" my-24 ">
                    <p className=" text-black font-semibold my-4">Share this article on social media</p>
                    <div className=" flex mt-4">
                        <Image src={assets.facebook_icon} width={50} />
                        <Image src={assets.twitter_icon} width={50} />
                        <Image src={assets.googleplus_icon} width={50} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default BlogPage;
