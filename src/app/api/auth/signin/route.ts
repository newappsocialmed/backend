import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";
 
export async function POST(request: Request) {
  const body = await request.json();

  try {
    const check = await sql`SELECT name from users WHERE name = ${body.name}`;
    if(check.rows.length > 0) return NextResponse.json({"status":"failed", "errMsg":"Username already exists"}, { status: 400 });
    const hashedPassword = await bcrypt.hash(body.password, 10);
    await sql`INSERT INTO users (name, password) VALUES (${body.name}, ${hashedPassword});`;
    return NextResponse.json({"status":"success", "msg":"login success"}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}