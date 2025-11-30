import { getToken } from "next-auth/jwt";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const url = req.nextUrl;
    
    if(token && url.pathname.startsWith('/auth')){
        return NextResponse.redirect(new URL('/', req.url));
    } else if(!token && !url.pathname.startsWith('/auth')){
        return NextResponse.redirect(new URL('/auth', req.url));
    }
}

export const config: MiddlewareConfig = {
    matcher: [
        '/',
        '/auth',
    ],
}