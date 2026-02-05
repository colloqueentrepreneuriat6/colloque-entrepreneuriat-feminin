import Link from "next/link";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-luxury-cream via-white to-luxury-pearl">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50/40 via-transparent to-accent-50/40"></div>
          <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
            <div className="text-center space-y-8 animate-fade-in">
              <div className="space-y-4">
                <p className="text-heading text-sm font-semibold uppercase tracking-widest text-primary-600 mb-2">
                  Université Abderrahmane MIRA de Bejaïa
                </p>
                <p className="text-body text-xs text-secondary-500 uppercase tracking-wider">
                  Faculté des sciences humaines et sociales • Laboratoire ESTERE • PRFU C0743600
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 rounded-full">
                  <span className="text-heading text-xs font-semibold text-primary-700">Colloque National</span>
                  <span className="mx-2 text-primary-400">•</span>
                  <span className="text-heading text-xs font-semibold text-accent-700">Mode Hybride</span>
                  <span className="mx-2 text-primary-400">•</span>
                  <span className="text-heading text-xs font-semibold text-primary-700">29 Avril 2026</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <h1 className="text-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-secondary-900 leading-tight">
                  Entrepreneuriat féminin
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">
                    en Algérie
                  </span>
                </h1>
                <p className="text-heading text-2xl text-secondary-600 font-medium max-w-3xl mx-auto">
                  Tendances, défis et opportunités
                </p>
              </div>
              
              <p className="text-body text-lg text-secondary-500 max-w-2xl mx-auto leading-relaxed">
                Plateforme de gestion des propositions de communication et du comité
                scientifique. Consultez l'argumentaire, les objectifs et les comités, ou connectez-vous pour accéder à votre espace.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                <Link href="/soumettre" className="btn-primary text-base px-8 py-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Soumettre une proposition
                </Link>
                <Link href="/presentation" className="btn-secondary text-base px-8 py-4">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-display text-4xl font-bold text-secondary-900 mb-4">
                Espace de soumission
              </h2>
              <p className="text-body text-xl text-secondary-600">
                Envoyez votre proposition et participez au colloque
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Card Email */}
              <Link href="#" className="group hover-lift">
                <div className="card-luxury p-8 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-heading text-2xl font-bold text-secondary-900 mb-4">
                    Soumission par Email
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-body text-secondary-600">
                      Envoyez votre proposition directement par email avec votre document en pièce jointe.
                    </p>
                    
                    <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4">
                      <p className="text-heading text-sm font-semibold text-primary-700 mb-1">Adresse email</p>
                      <p className="text-body text-primary-600 font-mono text-sm">colloque.entrepreneuriat6@gmail.com</p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-body text-sm text-secondary-500">
                        <span className="font-semibold text-secondary-700">Format requis :</span> Document Word (.doc ou .docx)
                      </p>
                      <p className="text-body text-sm text-secondary-500">
                        <span className="font-semibold text-secondary-700">Contenu :</span> Titre, coordonnées, texte complet
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-primary-600 font-semibold">
                    <span className="text-sm">Ouvrir le client email</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>

              {/* Card Formulaire */}
              <Link href="/soumettre" className="group hover-lift">
                <div className="card-luxury p-8 h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                  
                  <h3 className="text-heading text-2xl font-bold text-secondary-900 mb-4">
                    Formulaire en ligne
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <p className="text-body text-secondary-600">
                      Utilisez notre formulaire sécurisé pour soumettre votre proposition directement en ligne.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-body text-sm text-secondary-700">Soumission rapide et sécurisée</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-body text-sm text-secondary-700">Téléchargement de documents</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-success-100 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-body text-sm text-secondary-700">Confirmation immédiate</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-accent-600 font-semibold">
                    <span className="text-sm">Accéder au formulaire</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 bg-gradient-to-r from-primary-600 to-accent-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-display text-4xl font-bold text-white mb-6">
              Prêt à participer ?
            </h2>
            <p className="text-body text-xl text-white/90 mb-8">
              Rejoignez-nous pour explorer les opportunités de l'entrepreneuriat féminin en Algérie
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/connexion" className="bg-white text-primary-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Accéder à la plateforme
              </Link>
              <Link href="/presentation" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-primary-600 transition-all duration-300">
                Découvrir le colloque
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-secondary-200/60 bg-white/80 backdrop-blur-sm py-8">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-2">
          <p className="text-body text-sm text-secondary-600 font-medium">
            Ministère de l'enseignement supérieur et de la recherche scientifique
          </p>
          <p className="text-body text-sm text-secondary-500">
            Université Abderrahmane MIRA de Bejaïa — Colloque national — 29 avril 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
