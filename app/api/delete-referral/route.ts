import { IReferral } from "@/app/types/referrals";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const referralId = searchParams.get('id') ?
    parseInt(searchParams.get('id') as string) : 0;

  try{
    const deleteReferrals = await prisma.referrals.delete({
      where: {
        id: referralId,
      },
    })
    return NextResponse.json({ referral: deleteReferrals }, { status: 201 });
  } catch (error) {
    console.log('error--', error)
    return NextResponse.json({ error }, { status: 500 });
  }
}