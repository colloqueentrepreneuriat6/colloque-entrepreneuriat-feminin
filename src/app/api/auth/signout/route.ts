import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Utiliser la route NextAuth intégrée pour la déconnexion
  return NextResponse.redirect(new URL('/api/auth/signout', request.url));
}
