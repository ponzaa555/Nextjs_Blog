import { ConnectDb } from "@/lib/config/db";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { error } from "console";

const LoadDB = async () => {
  await ConnectDb();
};

LoadDB();
//Api Endpoint GetBlog
export async function GET(req: NextRequest) {
  try {
    const id = await req.nextUrl.searchParams.get("id");
    console.log(id);
    if (id) {
      const Blog = await prisma.blog.findFirst({
        where: {
          id: id,
        },
      });
      return NextResponse.json({ Blog }, { status: 200 });
    } else {
      const Blogs = await prisma.blog.findMany();
      return NextResponse.json({ Blogs }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred can't get blogs" },
      { status: 500 }
    );
  }
}

// Api Endpoint Post Blog
export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body from the request
    const body = await req.json();
    const { title, description, category, author, images, authorImg } = body;

    // Validate input fields
    if (
      !title ||
      !description ||
      !category ||
      !author ||
      !images ||
      !authorImg
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Create a new blog post with Prisma
    const newBlog = await prisma.blog.create({
      data: {
        title,
        description,
        category,
        author,
        images,
        authorImg,
      },
    });

    // Respond with the newly created blog post
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the blog post." },
      { status: 500 }
    );
  }
}

// Api EndPoint Delete
export async function DELETE(req: NextRequest) {
  try {
    const id = await req.nextUrl.searchParams.get("id");
    if (id) {
      const delBlog = await prisma.blog.delete({
        where: {
          id: id,
        },
      });
      return NextResponse.json({msg:"Delet Succese"},{status:200})
    }else{
      return NextResponse.json({error:"Can't find Blog "}, {status:500 })
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the blog post." },
      { status: 500 }
    );
  }
}
