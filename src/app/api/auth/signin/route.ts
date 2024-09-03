import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
  const body = await request.json();

  try {
    // const hashedPassword = await bcrypt.hash(body.password, 10);
    // return NextResponse.json({ hashedPassword }, { status: 500 });
    let res = {
        "status":"success",
        "msg":"login success"
    };
    return NextResponse.json({res}, { status: 200 });
    await sql`INSERT INTO users (Name, password) VALUES (${body.name}, ${body.password});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}