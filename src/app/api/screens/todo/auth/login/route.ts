import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";
 
export async function POST(request: Request) {
    const body = await request.json();
    try {
        const validuser = await sql`SELECT isadmin, password, id from users WHERE name = ${body.name}`;
        if(validuser.rows.length == 0)
            return NextResponse.json({"status":"failed", "msg":"User Not Found"}, { status: 200 });
        else{
            let hashPass = validuser.rows[0].password;
            const isValidUser = await bcrypt.compare(body.password, hashPass);
            if(isValidUser){
                return NextResponse.json({"status":"success", "msg":"Login success", "id":validuser.rows[0].id, "isAdmin":validuser.rows[0].isadmin}, { status: 200 });
            }
            else
                return NextResponse.json({"status":"failed", "msg":"Invalid User"}, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ "status":"failed", "error":error }, { status: 500 });
    }
}