import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    try {
        const check = await sql`SELECT completed from todo where id = ${id}`;
        if(check.rows[0].completed === false) {
            await sql`UPDATE todo SET completed = true WHERE id = ${id};`;
            return NextResponse.json({"status":"success", "msg":"Completed Task"}, { status: 200 });
        } else return NextResponse.json({"status":"failed", "msg":"Task Already Completed!!"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ "status":"failed", "error":error }, { status: 500 });
    }
}