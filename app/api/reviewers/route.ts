import { generateSearchUrl } from '@/app/misc/utils';
import prisma from '@/lib/prisma';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // console.log('searchParams---------', searchParams)

  // const url = searchParams ? generateSearchUrl(searchParams) : '';
  const url = ''
  console.log('url---------', url)

  try{
    // const reviewers = await sql`SELECT * FROM Reviewers ${url};`;
    const reviewers = await prisma.reviewers.findMany();
    return NextResponse.json({ reviewers }, { status: 200 });
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }
}