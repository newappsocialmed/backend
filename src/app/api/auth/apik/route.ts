import { NextResponse } from "next/server";
import 'dotenv/config';

export async function GET() {
    const apiK = process.env.API_KEY_SECRET;
    return NextResponse.json({apiK}, {status:200});
}