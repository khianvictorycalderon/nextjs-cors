import { NextRequest, NextResponse } from "next/server"

const allowedOrigins = ["http://localhost:3000", "https://yourdomain.com"]
const allowedMethods = ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
const allowedHeaders = ["Content-Type", "Authorization"]

export function corsMiddleware(req: NextRequest) {
  const origin = req.headers.get("origin") || "";

  // Check if the origin is allowed
  const isOriginAllowed = allowedOrigins.includes(origin)

  const res = NextResponse.next()

  if (isOriginAllowed) {
    res.headers.set("Access-Control-Allow-Origin", origin)
  }

  res.headers.set("Access-Control-Allow-Methods", allowedMethods.join(","))
  res.headers.set("Access-Control-Allow-Headers", allowedHeaders.join(","))
  res.headers.set("Access-Control-Allow-Credentials", "true")

  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: res.headers,
    })
  }

  return res
}
