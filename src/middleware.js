export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
// export function middleware(request) {
//   const { pathname } = request.nextUrl;
//   if (pathname == "/") {
//     return NextResponse.redirect("/auth/login");
//   }
//   return NextResponse.next();
//   //   return NextResponse.redirect(new URL("/auth/login", request.url));
// }

export const config = { matcher: ["/dashboard/:path*"] };
