import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from "bcrypt";
import { z } from "zod";
import { sign} from "jsonwebtoken";
 
export async function POST(request: Request) {
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
                const jwtToken = process.env.JWT_KEY_SECRET ?? "";
                if(jwtToken!=""){
                    const token = sign(
                        {
                            id: validuser.rows[0].id,
                            name: body.name,
                            password:hashPass
                        },
                        jwtToken,
                        {
                            expiresIn: "30d",
                        }
                    );
                    return NextResponse.json({"status":"success", "msg":"Login success", "jwtToken":token}, { status: 200 });
                }else
                    return NextResponse.json({"status":"failed", "msg":"JWT Key not found"}, { status: 500});
            }
            else
                return NextResponse.json({"status":"failed", "msg":"Invalid User"}, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ "status":"failed", "error":error }, { status: 500 });
    }
}