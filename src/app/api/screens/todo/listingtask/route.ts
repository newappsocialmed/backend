import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        const taskList = await sql`SELECT * from todo WHERE assignto = ${id} OR forwordto = ${id} AND completed = false`;
        return NextResponse.json({"status":"success", "data":taskList.rows}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ "status":"failed", "error":error }, { status: 500 });
    }
}