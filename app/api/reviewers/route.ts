import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const petName = searchParams.get('petName');
  // const ownerName = searchParams.get('ownerName');
 
  const reviewers = await sql`SELECT * FROM Reviewers;`;
  return NextResponse.json({ reviewers }, { status: 200 });
}