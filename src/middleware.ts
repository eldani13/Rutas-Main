import { NextRequest, NextResponse } from "next/server";
import { processEnv } from "./utils/cookies";

export function middleware(request: NextRequest) {
  const cookieSession = request.cookies.get(processEnv.jtIdentity);


  if (request.nextUrl.pathname.includes("/Inicio") && cookieSession === undefined) 
      return NextResponse.redirect(new URL("/", request.url))
  else if(request.nextUrl.pathname === "/" && cookieSession !== undefined)
    return NextResponse.redirect(new URL("/Inicio", request.url))


  return NextResponse.next();
}