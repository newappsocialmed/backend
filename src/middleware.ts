import { NextResponse } from "next/server";

export function middleware(request : Request) {
    const apiKey = request.headers.get('api-key');
    if (!apiKey || apiKey !== process.env.API_KEY_SECRET) {
        return NextResponse.json({ message: "Invalid api key" },{status:401});
    }else
        NextResponse.next();
}