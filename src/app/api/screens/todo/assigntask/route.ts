import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function POST(request: Request) {
    const body = await request.json();
    try {
        const name = await sql`SELECT name from users WHERE id = ${body.id}`;
        await sql`INSERT INTO todo (assignfrom, assignto, taskname, completed) VALUES (${name.rows[0].name}, ${body.assignto}, ${body.task}, false)`;
        return NextResponse.json({"status":"success", "msg":"Task Added"}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ "status":"failed", "error":error }, { status: 500 });
    }
}