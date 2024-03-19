import { IReviewer } from "@/app/types/reviewers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const reqBody: IReviewer = await request.json();

  try{
    const reviewer = await prisma.reviewers.create({
      data: {
        fullname: reqBody?.fullname,
        company: reqBody?.company,
        job_title: reqBody?.jobTitle,
        job_field: reqBody?.jobField,
        street_address: reqBody?.streetAddress,
        province: reqBody?.province,
        city: reqBody?.city,
        mobile: reqBody?.mobile,
        email: reqBody?.email,
      },
    });
    return NextResponse.json({ reviewer }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}