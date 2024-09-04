import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";
import { z } from "zod";
import { sign} from "jsonwebtoken";
import 'dotenv/config';
 
export async function POST(request: Request) {
    const apiKey = request.headers.get('api-key');
    if (!apiKey || apiKey !== process.env.API_KEY_SECRET) {
        return NextResponse.json({ message: "Invalid api key" },{status:401});
    }
    const body = await request.json();

    const schema = z.object({
        name: z.string().min(6),
        password: z.string().min(6)
    });

    const response = schema.safeParse(body);

    if (!response.success) {
        const { errors }  = response.error;
        return NextResponse.json({error: { message: "Invalid request", errors }}, { status: 400 });
    }

    try {
        const validuser = await sql`SELECT password, id from users WHERE name = ${body.name}`;
        if(validuser.rows.length == 0)
            return NextResponse.json({"status":"failed", "msg":"User Not Found"}, { status: 404 });
        else{
            let hashPass = validuser.rows[0].password;
            const isValidUser = await bcrypt.compare(body.password, hashPass);
            if(isValidUser){
                const jwtToken = process.env.JWT_TOKEN_SECRET ?? "";
                const token = sign(
                    {
                        id: validuser.rows[0].id,
                        name: body.name
                    },
                    jwtToken
                );
                return NextResponse.json({"status":"success", "msg":"Login success", "jwtToken":token}, { status: 200 });
            }
            else
                return NextResponse.json({"status":"failed", "msg":"Invalid User"}, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
}