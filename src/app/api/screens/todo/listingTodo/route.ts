import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        let value = await sql`SELECT value from flutter WHERE id = ${body.id};`;
        let updatedvalue = value.rows[0]['value'] + 1;
        await sql`UPDATE flutter SET value = ${updatedvalue} WHERE id = ${body.id};`;
        return NextResponse.json({ "status":"success", "msg":"Value updated successfully", "value":updatedvalue }, { status: 200 });
    } catch (error) {
        console.error('Error updating users:', error);
        return NextResponse.json({ error: error }, { status: 500 });
    }
}