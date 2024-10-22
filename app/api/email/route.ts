import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    const res = await prisma.subscibe.create({
      data: {
        email: email,
      },
    });
    return NextResponse.json({ res }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while creating the blog post." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const emails = await prisma.subscibe.findMany({});
    return NextResponse.json({ emails },{status:200});
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = await req.nextUrl.searchParams.get("id");
    if (id) {
      const res = await prisma.subscibe.delete({
        where: {
          id: id,
        },
      });
      return NextResponse.json({msg:"delete Success"},{status:200})
    } else {
      return NextResponse.json(
        { error: "Id not Found" },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while creating the blog post." },
      { status: 500 }
    );
  }
}
