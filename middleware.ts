import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/about-us',
  '/contact-us',
  '/information',
  '/our-mission',
  '/what-to-take',
  '/history',
  '/stages',
  '/book-bag-collection',
  '/advise',
  '/register-your-property',
  '/distance-calculator'
]);

export default clerkMiddleware((auth, req) => {
  console.log("🔹 Middleware running for:", req.nextUrl.pathname);

  const { userId } = auth();

  // Allow public pages without authentication.
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Protect all other pages.
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/public|.*\\.(?:jpg|jpeg|png|gif)$).*)'
  ],
};
