import { IReferral } from "@/app/types/referrals";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const reqBody: IReferral = await request.json();
  const id = reqBody?.id || 0

  try{
    const referral = await prisma.referrals.update({
      where: {
        id: id,
      },
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
    return NextResponse.json({ referral }, { status: 201 });
  } catch (error) {
    console.log('error--', error)
    return NextResponse.json({ error }, { status: 500 });
  }
}