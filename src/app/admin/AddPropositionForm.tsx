"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProposition } from "./actions";

export function AddPropositionForm() {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setMessage(null);
    const result = await addProposition(formData);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
      return;
    }
    setMessage({ type: "success", text: "Proposition enregistrée." });
    router.refresh();
  }

  return (
    <form action={handleSubmit} className="card p-6 space-y-4">
      <h2 className="font-display text-lg font-semibold text-stone-800">
        Ajouter une proposition
      </h2>
      <p className="text-sm text-stone-600">
        Saisissez les informations issues du document reçu (ou de la boîte mail).
      </p>
      <div>
        <label htmlFor="titre" className="block text-sm font-medium text-stone-700 mb-1">
          Intitulé de la communication <span className="text-red-500">*</span>
        </label>
        <input
          id="titre"
          name="titre"
          type="text"
          required
          placeholder="Ex. L’entrepreneuriat féminin dans l’artisanat à Bejaïa"
          className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="auteur_nom" className="block text-sm font-medium text-stone-700 mb-1">
            Nom de l’auteur(e)
          </label>
          <input
            id="auteur_nom"
            name="auteur_nom"
            type="text"
            placeholder="Ex. Fatima Benali"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
          />
        </div>
        <div>
          <label htmlFor="auteur_email" className="block text-sm font-medium text-stone-700 mb-1">
            Email de l’auteur(e)
          </label>
          <input
            id="auteur_email"
            name="auteur_email"
            type="email"
            placeholder="exemple@univ.dz"
            className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
          />
        </div>
      </div>
      <div>
        <label htmlFor="document_url" className="block text-sm font-medium text-stone-700 mb-1">
          Lien vers le document (Word)
        </label>
        <input
          id="document_url"
          name="document_url"
          type="url"
          placeholder="https://… ou chemin si stocké en ligne"
          className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
        />
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" className="btn-primary">
          Enregistrer la proposition
        </button>
        {message && (
          <p
            className={`text-sm ${
              message.type === "error" ? "text-red-600" : "text-brand-800"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}
