import { NextRequest, NextResponse } from 'next/server'
import { processEnv } from './utils/cookies'
import jwt from 'jsonwebtoken'
import { Routes } from './utils/Const'

export function middleware(request: NextRequest) {
  const cookieSession = request.cookies.get(processEnv.jtIdentity)
  const pathname = request.nextUrl.pathname

  const redirectTo = (url: string) =>
    NextResponse.redirect(new URL(url, request.url))

  console.log(jwt.decode(cookieSession?.value || ''))

  // Redirect if not logged in

  if (pathname.includes(Routes.inicio) && cookieSession === undefined)
    return redirectTo(Routes.login)

  if (pathname === Routes.court && cookieSession === undefined)
    return redirectTo(Routes.login)

  if (pathname === Routes.employees && cookieSession === undefined)
    return redirectTo(Routes.login)

  if (pathname === Routes.product && cookieSession === undefined)
    return redirectTo(Routes.login)

  if (pathname === Routes.routes && cookieSession === undefined)
    return redirectTo(Routes.login)

  if (pathname === Routes.routesId && cookieSession === undefined)
    return redirectTo(Routes.login)

  if (pathname === Routes.sales && cookieSession === undefined)
    return redirectTo(Routes.login)

  if (pathname === Routes.vehicle && cookieSession === undefined)
    return redirectTo(Routes.login)

  // Redirect if logged in
  if (pathname === Routes.login && cookieSession !== undefined)
    return redirectTo(Routes.inicio)

  return NextResponse.next()
}
