import { NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { sql } from "@vercel/postgres";

export async function middleware(request : Request) {
    const url = request.url;
    const path = url.split('/').slice(3).join('/');
    if(path.startsWith('api')){
        const apiKey = request.headers.get('api-key');
        if (!apiKey || apiKey !== process.env.API_KEY_SECRET) {
            return NextResponse.json({ message: "Invalid api key" },{status:401});
        }
    }
    if(path.startsWith('api/screens')){
        try{
            const jwtToken = request.headers.get('authorization');
            if (!jwtToken || !jwtToken.startsWith('Bearer ')) {
                return NextResponse.json({ message: "Invalid token" },{status:401});
            }
            let token = jwtToken.split(' ')[1];
            const decodedToken = jwt.decode(token) as JwtPayload | null;
            if (decodedToken && typeof decodedToken === 'object') {
                const validuser = await sql`SELECT password, id from users WHERE name = ${decodedToken.name}`;
                let hashPass = validuser.rows[0].password;
                if(validuser.rows.length == 0 || !validuser.rows[0].password === hashPass)
                    return NextResponse.json({"status":"failed", "msg":"Invalid User"}, { status: 404 });
                if(decodedToken.exp){
                    if(decodedToken.exp < (Date.now()/1000))
                        return NextResponse.json({"status":"failed", "msg":"Token expired"}, { status: 404 });
                }
            }else
                throw new Error("Invalid User")
        }catch(error){
            return NextResponse.json({"status":"failed", "errMsg":"invalid or expired token"}, {status:400});
        }
    }
    return NextResponse.next();
}