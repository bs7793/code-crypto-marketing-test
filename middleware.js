import { NextResponse } from 'next/server';

export async function middleware(request) {

  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/chat'],
};