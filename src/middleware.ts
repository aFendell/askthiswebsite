import { NextRequest, NextResponse } from 'next/server';
import { sessionCookieKey } from './constants/common';

export function middleware(req: NextRequest) {
  // TODO: Add matcher to controll when the moddleware runs
  const res = NextResponse.next();

  const cookie = req.cookies.get(sessionCookieKey);

  if (!cookie) {
    res.cookies.set(sessionCookieKey, crypto.randomUUID());
  }

  return res;
}
