import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(request: NextRequest) {
  try {
    // Récupérer l'URL de base pour la redirection
    const baseUrl = request.nextUrl.origin;
    
    // Créer une réponse qui redirige vers la page d'accueil
    const response = NextResponse.redirect(`${baseUrl}/?déconnexion=success`);
    
    // Supprimer le cookie de session
    response.cookies.delete('next-auth.session-token');
    response.cookies.delete('__Secure-next-auth.session-token');
    
    return response;
  } catch (error) {
    console.error('Erreur déconnexion:', error);
    // En cas d'erreur, rediriger quand même vers l'accueil
    return NextResponse.redirect(new URL('/', request.url));
  }
}
