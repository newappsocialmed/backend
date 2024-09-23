import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
    const body = await request.json();
    try {
        await sql`UPDATE todo SET forwordto = ${body.ForwardTo} WHERE id = ${body.Taskid};`;
        return NextResponse.json({"status":"success", "data":"Forward Task Success"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ "status":"failed", "error":error }, { status: 500 });
    }
}