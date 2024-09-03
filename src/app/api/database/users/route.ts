import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE users ( name varchar(255), password varchar(100), email varchar(100), phone bigint, dob date, profile_image character varying(600));`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}