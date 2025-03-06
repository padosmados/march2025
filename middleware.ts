import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  '/', '/about-us', '/contact-us', '/information', '/our-mission', '/what-to-take', '/history',
  '/stages', '/book-bag-collection', '/advise', '/register-your-property'
]);

export default clerkMiddleware((auth, req) => {
  console.log("🔹 Middleware running for:", req.nextUrl.pathname);

  const { userId } = auth();

  // ✅ Allow Public Pages Without Authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // ✅ Protect All Other Pages
  if (!userId) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public|api/public).*)",
  ],
};
