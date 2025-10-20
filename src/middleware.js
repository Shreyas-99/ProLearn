import { auth, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const isPublicRoute = createRouteMatcher([
  '/', // Your landing page route
  '/sign-in(.*)', // Clerk's default sign-in routes
  '/sign-up(.*)', // Clerk's default sign-up routes

  // Add any other public routes here, e.g., '/about', '/contact'
]);
export default clerkMiddleware(async (auth,req)=>{
  
  
if(!isPublicRoute(req)){
  await auth.protect();
}


 
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}



