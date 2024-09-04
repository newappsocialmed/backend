import { NextResponse } from "next/server";
import dotenv from 'dotenv';
dotenv.config({ path: '.env.production' });

export async function GET() {
    const apiK = process.env.API_KEY_SECRET;
    return NextResponse.json({apiK}, {status:200});
}