import { NextResponse } from 'next/server'; // Ensure NextResponse is imported correctly
import { sql } from '@vercel/postgres'; // Adjust this based on your actual SQL client

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await sql`UPDATE flutter SET value = ${body.value} WHERE id = ${body.id};`;

        return NextResponse.json({ "status":"success", "msg":"Value updated successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error updating users:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}