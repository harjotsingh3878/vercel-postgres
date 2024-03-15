import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export const dynamic = 'force-dynamic';
export async function POST(request: Request) {
  // const { searchParams } = new URL(request.url);
  // const petName = searchParams.get('petName');
  // const ownerName = searchParams.get('ownerName');

  const reviewer = {
    name: 'Peter',
    company: 'Google',
    jobTitle: 'Manager',
    streetAddress: '123 Main Street',
    provice: 'ON',
    city: 'Ottawa',
    mobile: '9876543210',
    email: 'test@test.com'
  }
 
  try {
    // if (!petName || !ownerName) throw new Error('Pet and owner names required');
    // await sql`INSERT INTO Reviewers (name, company, job_title, street_address, province, city, mobile, email) VALUES
    //   (${reviewer.name}, ${reviewer.company}, ${reviewer.jobTitle}, ${reviewer.streetAddress}, ${reviewer.provice}, ${reviewer.city}, ${reviewer.mobile}, ${reviewer.email});`;
    await sql`INSERT INTO Reviewers (name, company, job_title, street_address, province, city, mobile, email) VALUES
      (${reviewer.name}, ${reviewer.company}, ${reviewer.jobTitle}, ${reviewer.streetAddress}, ${reviewer.provice}, ${reviewer.city}, ${reviewer.mobile}, ${reviewer.email});`;
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error }, { status: 500 });
  }
 
  // const pets = await sql`SELECT * FROM Reviewers;`;
  // return NextResponse.json({ pets: pets.rows }, { status: 200 });
}