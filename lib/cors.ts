import { NextRequest, NextResponse } from "next/server";

const allowedOrigins = ["*"]; // Allow every origin
const allowedMethods = ["GET", "POST", "OPTIONS", "PUT", "DELETE"];
const allowedHeaders = ["Content-Type", "Authorization"];

export function cors(req: NextRequest, res: NextResponse) {
  const origin = req.headers.get("origin") || "";

  if (allowedOrigins.includes("*")) {
    res.headers.set("Access-Control-Allow-Origin", "*");
  } else if (allowedOrigins.includes(origin)) {
    res.headers.set("Access-Control-Allow-Origin", origin);
    res.headers.set("Vary", "Origin") // Optional, but useful when using dynamic origin
  }

  res.headers.set("Access-Control-Allow-Methods", allowedMethods.join(","));
  res.headers.set("Access-Control-Allow-Headers", allowedHeaders.join(","));
  res.headers.set("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: res.headers,
    });
  }

  return res;
}