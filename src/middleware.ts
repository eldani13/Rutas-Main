import { NextRequest, NextResponse } from "next/server";
import { processEnv } from "./utils/cookies";
import jwt from "jsonwebtoken";
import { Routes } from "./utils/Const";

export function middleware(request: NextRequest) {
  const cookieSession = request.cookies.get(processEnv.jtIdentity);
  const pathname = request.nextUrl.pathname;

  if (cookieSession === undefined && pathname.includes(Routes.inicio))
    return NextResponse.redirect(new URL(Routes.login, request.url));
  else if (pathname === Routes.login && cookieSession != undefined)
    return NextResponse.redirect(new URL(Routes.inicio, request.url));

  if (cookieSession) {
    console.log(jwt.decode(cookieSession.value));
    const { username, role } = jwt.decode(cookieSession.value) as {
      username: string;
      role: string;
      exp: number;
      iat: number;
    };

    if (
      role == "empleado" &&
      (pathname.includes(Routes.court) ||
        pathname.includes(Routes.product) ||
        // pathname.includes(Routes.employees) ||
        pathname.includes(Routes.vehicle))
    ) {
      return NextResponse.redirect(new URL(Routes.inicio, request.url));
    }
  }

  return NextResponse.next();
}
