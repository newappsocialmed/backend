import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const pets = await sql`SELECT * FROM users;`;
  let res = pets.rows;
  return NextResponse.json({ res }, { status: 200 });
}