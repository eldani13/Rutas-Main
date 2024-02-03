import { NextRequest, NextResponse } from "next/server";
import { processEnv } from "./utils/cookies";

export function middleware(request: NextRequest) {
  const cookieSession = request.cookies.get(processEnv.jtIdentity);
  // console.log(request.headers)
  

  if(request.nextUrl.pathname.includes("/Inicio")){
    if(cookieSession === undefined){
      return NextResponse.redirect(new URL("/", request.url))
    }
    else if(request.nextUrl.pathname.includes("/Inicio/routes") && cookieSession.value != "addmin"){
      // return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next();
}