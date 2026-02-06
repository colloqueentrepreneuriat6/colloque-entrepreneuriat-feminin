import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function DeconnexionPage() {
  // Forcer la déconnexion - ne pas afficher le Header
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-luxury-cream via-white to-luxury-pearl">
      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="max-w-md w-full">
          <div className="card-elevated p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h1 className="text-display text-2xl font-bold text-secondary-900 mb-4">
              Déconnexion réussie
            </h1>
            
            <p className="text-body text-secondary-600 mb-8">
              Merci de votre visite. À bientôt sur le colloque national sur l'entrepreneuriat féminin en Algérie.
            </p>
            
            <div className="space-y-3">
              <a
                href="/"
                className="btn-primary w-full inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Retour à l'accueil
              </a>
              
              <a
                href="/connexion"
                className="btn-secondary w-full inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Se reconnecter
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
