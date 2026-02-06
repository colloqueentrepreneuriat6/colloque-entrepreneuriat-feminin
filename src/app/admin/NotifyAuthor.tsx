"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePropositionStatus } from "./actions";

type Evaluation = { decision: string; remarques: string | null };

function getDecisionLabel(evaluations: Evaluation[]): string {
  const acceptCount = evaluations.filter((e) => e.decision === "accepte").length;
  const refuseCount = evaluations.filter((e) => e.decision === "refuse").length;
  
  if (acceptCount > refuseCount) return "Acceptée";
  if (refuseCount > acceptCount) return "Refusée";
  return "En attente de décision finale";
}

export function NotifyAuthor({
  propositionId,
  auteurEmail,
  titre,
  evaluations,
}: {
  propositionId: string;
  auteurEmail: string | null;
  titre: string;
  evaluations: Evaluation[];
}) {
  const router = useRouter();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [manualDecision, setManualDecision] = useState<string>("");
  const decisionLabel = getDecisionLabel(evaluations);
  const isPending = decisionLabel === "En attente de décision finale";
  const subject = encodeURIComponent("Colloque - Décision sur votre proposition");
  
  // Créer un mailto simple qui ouvrira le client email par défaut
  const mailtoBody = encodeURIComponent(
    `Bonjour,\n\n` +
    `Nous vous remercions pour votre soumission au Colloque National sur l'Entrepreneuriat Féminin.\n\n` +
    `Intitulé de votre proposition : ${titre}\n\n` +
    `Décision du comité scientifique : ${decisionLabel}\n\n` +
    `Le comité scientifique a examiné attentivement votre proposition.\n\n` +
    `Cordialement,\n` +
    `HADERBACHE Bachir, professeur en sociologie, Université ABDERRAHMANE Mira de Bejaia`
  );
  
  const mailto = auteurEmail
    ? `mailto:${auteurEmail}?subject=${subject}&body=${mailtoBody}`
    : null;

  async function handleSendEmail() {
    setMessage(null);
    
    try {
      const formData = new FormData();
      formData.append("proposition_id", propositionId);
      formData.append("auteur_email", auteurEmail || "");
      formData.append("titre", titre);
      
      // Utiliser la décision manuelle si définie, sinon calculer automatiquement
      let decision = manualDecision || "";
      if (!decision) {
        const acceptCount = evaluations.filter((e) => e.decision === "accepte").length;
        const refuseCount = evaluations.filter((e) => e.decision === "refuse").length;
        if (acceptCount > refuseCount) decision = "accepte";
        else if (refuseCount > acceptCount) decision = "refuse";
        else decision = "pending";
      }
      
      formData.append("decision", decision);
      
      const response = await fetch("/api/send-decision-email", {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();
      
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "Mail de notification envoyé avec succès !" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erreur lors de l'envoi de l'email" });
    }
  }

  async function handleMarkNotified(formData: FormData) {
    setMessage(null);
    const result = await updatePropositionStatus(formData);
    if (result.error) {
      setMessage({ type: "error", text: result.error });
      return;
    }
    setMessage({ type: "success", text: "Marquée comme notifiée." });
    router.refresh();
  }

  return (
    <div className="mt-4 p-4 rounded-lg bg-stone-50 border border-stone-200 space-y-3">
      <p className="text-sm font-medium text-stone-800">
        Décision : <span className={isPending ? "text-orange-600" : decisionLabel === "Acceptée" ? "text-green-600" : "text-red-600"}>
          {manualDecision === "accepte" ? "Acceptée (forcée)" : 
           manualDecision === "refuse" ? "Refusée (forcée)" : 
           decisionLabel}
        </span>
      </p>
      
      {isPending && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <p className="text-sm font-medium text-orange-800 mb-2">
            ⚖️ Égalité des rapporteurs - Décision finale requise
          </p>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setManualDecision("accepte")}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                manualDecision === "accepte" 
                  ? "bg-green-600 text-white" 
                  : "bg-green-100 text-green-800 hover:bg-green-200"
              }`}
            >
              ✅ Forcer Acceptée
            </button>
            <button
              onClick={() => setManualDecision("refuse")}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                manualDecision === "refuse" 
                  ? "bg-red-600 text-white" 
                  : "bg-red-100 text-red-800 hover:bg-red-200"
              }`}
            >
              ❌ Forcer Refusée
            </button>
            {manualDecision && (
              <button
                onClick={() => setManualDecision("")}
                className="px-3 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
              >
                ↩️ Annuler
              </button>
            )}
          </div>
        </div>
      )}
      
      <div className="text-sm text-stone-600 space-y-2">
        {evaluations.map((e, i) => (
          <div key={i}>
            <span className="font-medium">
              Rapporteur {i + 1} : {e.decision === "accepte" ? "Accepter" : "Refuser"}
            </span>
            {e.remarques && (
              <p className="text-xs text-stone-500 mt-1 italic">{e.remarques}</p>
            )}
          </div>
        ))}
      </div>

      {message && (
        <div
          className={`p-3 rounded text-sm ${
            message.type === "error"
              ? "bg-red-50 text-red-700 border border-red-200"
              : "bg-green-50 text-green-700 border border-green-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {mailto ? (
          <>
            <button
              onClick={handleSendEmail}
              className="btn-primary text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              📧 Envoyer le mail de notification
            </button>
            <a
              href={mailto}
              className="btn-secondary text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              � Ouvrir client email
            </a>
          </>
        ) : (
          <p className="text-sm text-stone-500 italic">
            Email de l'auteur non disponible
          </p>
        )}

        <form action={handleMarkNotified} className="inline">
          <input type="hidden" name="proposition_id" value={propositionId} />
          <input type="hidden" name="statut" value="notifiee" />
          <button type="submit" className="btn-secondary text-sm">
            ✓ Marquer comme notifiée
          </button>
        </form>
      </div>
    </div>
  );
}
