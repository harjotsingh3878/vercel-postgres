import { generateSearchWhere } from '@/app/misc/utils';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
 
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const referralId = searchParams.get('id') ?
    parseInt(searchParams.get('id') as string) : 0;

  try{
    const referral = await prisma.referrals.findUnique({
      where: {
        id: (referralId)
      }
    });
    return NextResponse.json({ referral }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}