import { NextApiRequest, NextApiResponse } from 'next'
import Cors from 'cors'
import type { CorsOptions } from 'cors'

const isProduction = process.env.NODE_ENV === "production";
const origin = isProduction ? "https://yourdomain.com" : "*";

type Middleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  result: (result: unknown) => void
) => void;

export function initMiddleware(middleware: Middleware) {
  return (req: NextApiRequest, res: NextApiResponse) =>
    new Promise<void>((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) return reject(result);
        return resolve();
      });
    });
}

// Create a pre-configured CORS middleware you can import in your API routes
export const cors = initMiddleware(
  Cors({
    methods: [
        "GET",
        "HEAD",
        "PUT",
        "PATCH",
        "POST",
        "DELETE",
        "OPTIONS",
    ],
    origin: origin,
  } as CorsOptions)
);
