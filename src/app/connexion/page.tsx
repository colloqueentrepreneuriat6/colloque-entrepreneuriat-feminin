"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Header } from "@/components/Header";

export default function ConnexionPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("Nom d'utilisateur ou mot de passe incorrect.");
      return;
    }
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex flex-col bg-luxe-cream">
      <header className="border-b border-stone-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-tight text-stone-800 hover:text-brand-800 transition"
          >
            Colloque national
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md card-elevated p-8 sm:p-10">
          <div className="text-center mb-8">
            <p className="font-display text-xs font-medium uppercase tracking-widest text-luxe-gold mb-2">
              Comité scientifique
            </p>
            <h1 className="font-display text-2xl font-semibold text-stone-900">
              Connexion
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Entrepreneuriat féminin en Algérie
            </p>
          </div>

          <form onSubmit={handleCredentials} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-stone-700 mb-1"
              >
                Nom d&apos;utilisateur
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                placeholder="Ex. rapporteur1"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-700 mb-1"
              >
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
                placeholder="••••••••"
                required
              />
            </div>
            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-stone-500 hover:text-stone-700 transition"
            >
              ← Retour à l&apos;accueil
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
