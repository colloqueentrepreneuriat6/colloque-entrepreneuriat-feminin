"use client";

import { useState } from "react";
import { submitProposition } from "./actions";

export function SoumettreForm() {
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setMessage(null);
    setLoading(true);
    const result = await submitProposition(formData);
    setLoading(false);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
      return;
    }
    setMessage({
      type: "success",
      text: "Votre proposition a bien été enregistrée. Vous recevrez une réponse après évaluation par le comité scientifique.",
    });
  }

  return (
    <form
      className="card p-6 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(new FormData(e.currentTarget));
      }}
    >
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
            Nom du ou de la communicant(e)
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
            Adresse courriel
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
        <label htmlFor="document" className="block text-sm font-medium text-stone-700 mb-1">
          Document Word (optionnel)
        </label>
        <input
          id="document"
          name="document"
          type="file"
          accept=".doc,.docx"
          className="w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 file:mr-4 file:rounded file:border-0 file:bg-brand-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-brand-800 focus:border-brand-600 focus:ring-2 focus:ring-brand-500/20 outline-none transition"
        />
        <p className="mt-1 text-xs text-stone-500">
          Formats acceptés : .doc, .docx. Vous pouvez aussi envoyer votre document à colloque.entrepreneuriat6@gmail.com.
        </p>
      </div>
      {message && (
        <p
          className={`rounded-lg px-3 py-2 text-sm ${
            message.type === "error"
              ? "bg-red-50 text-red-700"
              : "bg-brand-50 text-brand-800"
          }`}
        >
          {message.text}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-primary py-3 rounded-lg disabled:opacity-50"
      >
        {loading ? "Envoi en cours…" : "Envoyer ma proposition"}
      </button>
    </form>
  );
}
