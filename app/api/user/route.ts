import { NextRequest, NextResponse } from 'next/server'
import { cors } from '@/lib/cors'

export async function GET(req: NextRequest) {
    const res = NextResponse.json({ 
        message: "Fetch success!"
    }, {
        status: 200
    })
    return cors(req, res);
}

export async function POST(req: NextRequest) {
    const body = await req.json(); // JSON middleware
    const { name } = body;
    console.log(`Name received: ${name}`);

    const res = NextResponse.json({
        message: "Name received at the server!"
    }, {
        status: 200
    });
    return cors(req, res);
}

export async function OPTIONS(req: NextRequest) {
    return cors(req, new NextResponse());
}