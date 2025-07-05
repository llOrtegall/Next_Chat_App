import { handlers, auth } from "@/auth"
export const { GET, POST } = handlers

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await auth();

  // Rutas protegidas
  const protectedPaths = ["/home"];

  if (
    protectedPaths.some((path) => request.nextUrl.pathname.startsWith(path)) &&
    !session
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
