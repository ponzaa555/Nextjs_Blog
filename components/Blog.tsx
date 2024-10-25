import Image from "next/image";

interface BlogProps {
    id: number;
    // images: string; // Assuming 'images' is an array of image URLs
    title: string;
    category: string;
    description: string;
}

const Blog: React.FC<BlogProps> = ({ id, category, title, description }) => {
    return (
        <div className=" border w-[300px] border-black border-b-2 hover:shadow-[-5px_5px_0px_#000000]" key={id} >
            {/* Images */}
            <div>
                <Image src="/image.png" width={300} height={100} alt="" />
            </div>
            {/* body */}
            <div className=" m-5 ">
                <div className=" flex">
                    <h3 className=" text-xs font-bold text-white bg-black p-1 rounded-sm ">{category}</h3>
                </div>
                <div className=" mt-3 text-wrap space-y-3">
                    <h1 className="text-md font-semibold">{title}</h1>
                    <p className="text-sm tracking-tight text-gray-700" dangerouslySetInnerHTML={{__html:description.slice(0,120)}}>
                    </p>
                </div>
                <div className=" mt-5 mb-2 font-bold hover:cursor-pointer">
                    <h1>Read more -></h1>
                </div>
            </div>
        </div>
    );
};

export default Blog;
