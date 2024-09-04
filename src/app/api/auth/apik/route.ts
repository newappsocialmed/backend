import { NextResponse } from "next/server";

export async function GET() {
    const apiK = process.env.API_KEY_SECRET;
    return NextResponse.json({apiK}, {status:200});
}