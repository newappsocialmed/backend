import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";
 
export async function POST(request: Request) {
  const body = await request.json();

  try {
    const check = await sql`SELECT username from flutter WHERE username = ${body.name}`;
    if(check.rows.length > 0) return NextResponse.json({"status":"failed", "msg":"Username already exists"}, { status: 200 });
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await sql`INSERT INTO flutter (username, password, value) VALUES (${body.name}, ${hashedPassword}, 0)`;
    return NextResponse.json({"status":"success", "msg":"signin success"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ "status":"failed", "msg":error }, { status: 500 });
  }
}