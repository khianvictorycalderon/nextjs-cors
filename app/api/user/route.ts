import { NextRequest, NextResponse } from 'next/server'
import { cors } from '@/lib/cors'

export async function GET(req: NextRequest) {
    const res = NextResponse.json({ 
        message: "Fetch success!"
    })
    return cors(req, res);
}

export async function OPTIONS(req: NextRequest) {
    return cors(req, new NextResponse());
}