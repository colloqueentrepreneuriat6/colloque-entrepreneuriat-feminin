"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { assignReviewers } from "./actions";

type Reviewer = { id: string; name: string; email: string };

export function AssignForm({
  propositionId,
  propositionTitre,
  reviewers,
}: {
  propositionId: string;
  propositionTitre: string;
  reviewers: Reviewer[];
}) {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [open, setOpen] = useState(false);

  if (reviewers.length < 2) {
    return (
      <span className="text-xs text-stone-500">
        Ajoutez au moins 2 rapporteurs dans users.json pour attribuer.
      </span>
    );
  }

  async function handleSubmit(formData: FormData) {
    setMessage(null);
    
    // Récupérer les deux reviewers séparément
    const reviewer1 = formData.get("reviewer1_id") as string;
    const reviewer2 = formData.get("reviewer2_id") as string;
    
    // Validation
    if (!reviewer1 || !reviewer2) {
      setMessage({ type: "error", text: "Veuillez sélectionner deux rapporteurs différents." });
      return;
    }
    
    if (reviewer1 === reviewer2) {
      setMessage({ type: "error", text: "Veuillez sélectionner deux rapporteurs différents." });
      return;
    }
    
    // Créer un nouveau FormData avec les deux reviewers
    const newFormData = new FormData();
    newFormData.append("proposition_id", formData.get("proposition_id") as string);
    newFormData.append("reviewer_ids", reviewer1);
    newFormData.append("reviewer_ids", reviewer2);
    
    const result = await assignReviewers(newFormData);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
      return;
    }
    setMessage({ type: "success", text: "Deux rapporteurs ont été attribués avec succès (évaluation en aveugle)." });
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="text-sm font-medium text-brand-800 hover:text-brand-900 transition text-left"
      >
        {open ? "Annuler" : "Attribuer à 2 rapporteurs"}
      </button>
      {open && (
        <form
          className="flex flex-wrap items-end gap-3 p-4 rounded-lg bg-stone-50 border border-stone-200"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit(new FormData(e.currentTarget));
          }}
        >
          <input type="hidden" name="proposition_id" value={propositionId} />
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-medium text-stone-600 mb-1">Rapporteur 1</label>
            <select
              name="reviewer1_id"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-brand-600 focus:ring-1 focus:ring-brand-500/20 outline-none"
              required
            >
              <option value="">Choisir…</option>
              {reviewers.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs font-medium text-stone-600 mb-1">Rapporteur 2</label>
            <select
              name="reviewer2_id"
              className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-900 focus:border-brand-600 focus:ring-1 focus:ring-brand-500/20 outline-none"
              required
            >
              <option value="">Choisir…</option>
              {reviewers.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-primary text-sm py-2">
            Attribuer
          </button>
          {message && (
            <p
              className={`w-full text-sm ${
                message.type === "error" ? "text-red-600" : "text-brand-800"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
