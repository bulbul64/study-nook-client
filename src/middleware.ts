import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;


  if (pathname.startsWith('/api/v1')) {

    const backendPath = pathname.replace(/^\/api\/v1/, '');
    const backendUrl = new URL(backendPath, 'http://localhost:5000');


    backendUrl.search = request.nextUrl.search;

    return NextResponse.rewrite(backendUrl);
  }

  return NextResponse.next();
}


export const config = {
  matcher: '/api/v1/:path*',
};