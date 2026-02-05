"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updatePropositionStatus } from "./actions";

type Evaluation = { decision: string; remarques: string | null };

function buildEmailBody(
  titre: string,
  evals: Evaluation[],
  decisionLabel: string
): string {
  const lines = [
    `Objet : Colloque national - Décision sur votre proposition de communication`,
    "",
    `Intitulé de votre proposition : ${titre}`,
    "",
    `Décision du comité scientifique : ${decisionLabel}`,
    "",
    "Remarques des rapporteurs :",
  ];
  evals.forEach((e, i) => {
    lines.push(`\nRapporteur ${i + 1} (${e.decision === "accepte" ? "Accepter" : "Refuser"}) :`);
    lines.push(e.remarques?.trim() || "(Aucune remarque)");
  });
  lines.push("\n\n--");
  lines.push("Colloque national - Entrepreneuriat féminin en Algérie, tendances, défis et opportunités");
  lines.push("29 avril 2026 - Université Abderrahmane MIRA de Bejaïa");
  return lines.join("\n");
}

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
  const decisionLabel = getDecisionLabel(evaluations);
  const subject = encodeURIComponent("Colloque - Décision sur votre proposition");
  const body = encodeURIComponent(buildEmailBody(titre, evaluations, decisionLabel));
  const mailto = auteurEmail
    ? `mailto:${auteurEmail}?subject=${subject}&body=${body}`
    : null;

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
      <p className="text-sm font-medium text-stone-800">Décision : {decisionLabel}</p>
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
          <a
            href={mailto}
            className="btn-primary text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            📧 Envoyer l'email
          </a>
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
