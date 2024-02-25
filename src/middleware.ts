import { NextRequest, NextResponse } from "next/server";
import { processEnv } from "./utils/cookies";
import jwt from "jsonwebtoken";
import { Routes } from "./utils/Const";

export function middleware(request: NextRequest) {
  const cookieSession = request.cookies.get(processEnv.jtIdentity);
  const pathname = request.nextUrl.pathname;

  const redirectTo = (url: string) =>
    NextResponse.redirect(new URL(url, request.url));

  if (cookieSession === undefined && pathname === Routes.login)
    return NextResponse.next();

  if (cookieSession === undefined) return redirectTo(Routes.login);
  else if (pathname === Routes.login) return redirectTo(Routes.inicio);
  console.log("here");

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
      pathname.includes(Routes.employees) ||
      pathname.includes(Routes.vehicle))
  ) {
    return redirectTo(Routes.inicio);
  }

  return NextResponse.next();
}
