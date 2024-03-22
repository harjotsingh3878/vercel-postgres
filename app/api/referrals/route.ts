import { generateSearchWhere } from '@/app/misc/utils';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
 
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const constructedWhere = searchParams ? generateSearchWhere(searchParams) : {}

  try{
    const referrals = await prisma.referrals.findMany({
      where: constructedWhere
    });
    return NextResponse.json({ referrals }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}