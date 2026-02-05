import Link from "next/link";
import { Header } from "@/components/Header";
import { SoumettreForm } from "./SoumettreForm";

export default function SoumettrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-luxe-cream">
      <Header />
      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-xl">
          <div className="mb-8">
            <p className="font-display text-xs font-medium uppercase tracking-widest text-luxe-gold mb-1">
              Colloque national — 29 avril 2026
            </p>
            <h1 className="font-display text-2xl font-semibold text-stone-900">
              Soumettre une proposition de communication
            </h1>
            <p className="mt-2 text-sm text-stone-600">
              Remplissez le formulaire ci-dessous. Vous pouvez aussi envoyer votre proposition par courriel à{" "}
              <strong className="text-brand-800">colloque.entrepreneuriat6@gmail.com</strong> (document Word en pièce jointe).
            </p>
          </div>

          <SoumettreForm />

          <p className="mt-6 text-center">
            <Link href="/" className="text-sm text-stone-500 hover:text-stone-700 transition">
              ← Retour à l’accueil
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
