"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateEvaluation } from "./actions";

export function EditEvaluationForm({
  propositionId,
  propositionTitre,
  currentEvaluation,
}: {
  propositionId: string;
  propositionTitre: string;
  currentEvaluation: {
    decision: string;
    remarques: string | null;
  };
}) {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    decision: currentEvaluation.decision,
    remarques: currentEvaluation.remarques || "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    
    const submitData = new FormData();
    submitData.append("proposition_id", propositionId);
    submitData.append("decision", formData.decision);
    submitData.append("remarques", formData.remarques);
    
    const result = await updateEvaluation(submitData);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
      return;
    }
    setMessage({ type: "success", text: "Votre évaluation a bien été mise à jour." });
    setOpen(false);
    router.refresh();
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        {open ? "Annuler" : "Modifier mon évaluation"}
      </button>
      
      {open && (
        <form
          className="mt-3 p-4 rounded-lg bg-gradient-to-br from-accent-50 to-primary-50 border border-accent-200 space-y-4"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="proposition_id" value={propositionId} />
          
          <div>
            <label className="block text-xs font-medium text-accent-700 mb-2">Décision</label>
            <div className="flex gap-4">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="decision" 
                  value="accepte" 
                  checked={formData.decision === "accepte"}
                  onChange={(e) => setFormData({...formData, decision: e.target.value})}
                  className="text-accent-600" 
                />
                <span className="text-sm text-accent-800">Accepter</span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="decision" 
                  value="refuse" 
                  checked={formData.decision === "refuse"}
                  onChange={(e) => setFormData({...formData, decision: e.target.value})}
                  className="text-accent-600" 
                />
                <span className="text-sm text-accent-800">Refuser</span>
              </label>
            </div>
          </div>
          
          <div>
            <label htmlFor={`edit-remarques-${propositionId}`} className="block text-xs font-medium text-accent-700 mb-1">
              Remarques (optionnel)
            </label>
            <textarea
              id={`edit-remarques-${propositionId}`}
              value={formData.remarques}
              onChange={(e) => setFormData({...formData, remarques: e.target.value})}
              rows={4}
              placeholder="Vos commentaires pour l'auteur(e) et le comité…"
              className="w-full rounded-lg border border-accent-300 px-3 py-2 text-sm text-accent-900 placeholder-accent-400 focus:border-accent-600 focus:ring-1 focus:ring-accent-500/20 outline-none transition"
            />
          </div>
          
          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              message.type === "error" 
                ? "bg-red-50 text-red-700 border border-red-200" 
                : "bg-green-50 text-green-700 border border-green-200"
            }`}>
              {message.text}
            </div>
          )}
          
          <div className="flex gap-2">
            <button type="submit" className="btn-primary text-sm py-2">
              Mettre à jour mon évaluation
            </button>
            <button 
              type="button" 
              onClick={() => setOpen(false)}
              className="btn-secondary text-sm py-2"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
