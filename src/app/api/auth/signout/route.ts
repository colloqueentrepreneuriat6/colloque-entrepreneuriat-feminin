import { NextRequest, NextResponse } from 'next/server';
import { signOut } from 'next-auth/react';

export async function POST(request: NextRequest) {
  try {
    // Récupérer l'URL de base pour la redirection
    const baseUrl = request.nextUrl.origin;
    
    // Déconnecter l'utilisateur
    await signOut({ redirect: false });
    
    // Rediriger vers la page d'accueil avec un message
    return NextResponse.redirect(`${baseUrl}/?message=déconnecté`);
  } catch (error) {
    console.error('Erreur déconnexion:', error);
    // En cas d'erreur, rediriger quand même vers l'accueil
    return NextResponse.redirect(new URL('/', request.url));
  }
}
