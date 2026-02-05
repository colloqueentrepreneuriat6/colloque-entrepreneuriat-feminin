import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function Header() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-secondary-200/60">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-premium transition-all duration-300">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-display text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors duration-300">
                Colloque National
              </h1>
              <p className="text-body text-xs text-secondary-500">
                Entrepreneuriat Féminin
              </p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/presentation"
              className="text-body text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors duration-200 relative group"
            >
              Le colloque
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/soumettre"
              className="text-body text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors duration-200 relative group"
            >
              Soumettre
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              href="/comite"
              className="text-body text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors duration-200 relative group"
            >
              Comité
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {session ? (
              <>
                {/* User Info */}
                <div className="hidden sm:flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-accent-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {session.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <span className="text-body text-sm text-secondary-600">{session.user?.name}</span>
                </div>

                {/* Admin/Reviewer Links */}
                {role === "admin" && (
                  <Link
                    href="/admin"
                    className="btn-accent text-sm px-4 py-2"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Admin
                  </Link>
                )}
                {role === "reviewer" && (
                  <Link
                    href="/comite"
                    className="btn-secondary text-sm px-4 py-2"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Espace comité
                  </Link>
                )}

                {/* Logout */}
                <form action="/api/auth/signout" method="POST">
                  <button
                    type="submit"
                    className="text-body text-sm text-secondary-500 hover:text-danger-600 transition-colors duration-200 p-2 rounded-lg hover:bg-danger-50"
                    title="Déconnexion"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* Mobile Menu Button */}
                <button className="lg:hidden p-2 rounded-lg text-secondary-600 hover:bg-secondary-100">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                
                {/* Login Button */}
                <Link href="/connexion" className="btn-primary text-sm px-6 py-2">
                  Connexion
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {session && (
          <div className="lg:hidden border-t border-secondary-200/60 px-6 py-3">
            <nav className="flex space-x-6 overflow-x-auto">
              <Link
                href="/presentation"
                className="text-body text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors duration-200 whitespace-nowrap"
              >
                Le colloque
              </Link>
              <Link
                href="/soumettre"
                className="text-body text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors duration-200 whitespace-nowrap"
              >
                Soumettre
              </Link>
              <Link
                href="/comite"
                className="text-body text-sm font-medium text-secondary-600 hover:text-primary-600 transition-colors duration-200 whitespace-nowrap"
              >
                Comité
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
