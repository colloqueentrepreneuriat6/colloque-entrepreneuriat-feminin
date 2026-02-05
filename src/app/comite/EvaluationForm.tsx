"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitEvaluation } from "./actions";

export function EvaluationForm({
  propositionId,
  propositionTitre,
}: {
  propositionId: string;
  propositionTitre: string;
}) {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [open, setOpen] = useState(false);

  async function handleSubmit(formData: FormData) {
    setMessage(null);
    const result = await submitEvaluation(formData);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
      return;
    }
    setMessage({ type: "success", text: "Votre évaluation a bien été enregistrée." });
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-sm font-medium text-brand-800 hover:text-brand-900 transition"
      >
        {open ? "Annuler" : "Soumettre mon évaluation"}
      </button>
      {open && (
        <form
          className="mt-3 p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(new FormData(e.currentTarget));
          }}
        >
          <input type="hidden" name="proposition_id" value={propositionId} />
          <div>
            <label className="block text-xs font-medium text-stone-600 mb-2">Décision</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="radio" name="decision" value="accepte" required className="text-brand-600" />
                <span className="text-sm text-stone-700">Accepter</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input type="radio" name="decision" value="refuse" className="text-brand-600" />
                <span className="text-sm text-stone-700">Refuser</span>
              </label>
            </div>
          </div>
          <div>
            <label htmlFor={`remarques-${propositionId}`} className="block text-xs font-medium text-stone-600 mb-1">
              Remarques (optionnel)
            </label>
            <textarea
              id={`remarques-${propositionId}`}
              name="remarques"
              rows={4}
              placeholder="Vos commentaires pour l'auteur(e) et le comité…"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 placeholder-stone-400 focus:border-brand-600 focus:ring-1 focus:ring-brand-500/20 outline-none transition"
            />
          </div>
          {message && (
            <p className={`text-sm ${message.type === "error" ? "text-red-600" : "text-brand-800"}`}>
              {message.text}
            </p>
          )}
          <button type="submit" className="btn-primary text-sm py-2">
            Envoyer mon évaluation
          </button>
        </form>
      )}
    </div>
  );
}
