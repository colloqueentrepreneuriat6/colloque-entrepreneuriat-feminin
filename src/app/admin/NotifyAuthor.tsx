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

function getDecisionLabel(evals: Evaluation[]): string {
  const acceptCount = evals.filter((e) => e.decision === "accepte").length;
  if (acceptCount === 2) return "Votre proposition a été acceptée.";
  if (acceptCount === 0) return "Votre proposition n'a pas été retenue.";
  return "Le comité a rendu des avis partagés : un rapporteur a accepté, un a refusé.";
}

export function NotifyAuthor({
  propositionId,
  titre,
  auteurEmail,
  evaluations,
}: {
  propositionId: string;
  titre: string;
  auteurEmail: string | null;
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
            {e.remarques && <p className="mt-0.5 whitespace-pre-wrap">{e.remarques}</p>}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3 pt-2">
        {auteurEmail && mailto && (
          <a
            href={mailto}
            className="btn-primary text-sm py-2"
          >
            Notifier l&apos;auteur par email
          </a>
        )}
        {!auteurEmail && (
          <span className="text-sm text-stone-500">Aucune adresse email pour cette proposition.</span>
        )}
        <form
          className="inline"
          onSubmit={(e) => {
            e.preventDefault();
            handleMarkNotified(new FormData(e.currentTarget));
          }}
        >
          <input type="hidden" name="proposition_id" value={propositionId} />
          <button type="submit" className="btn-secondary text-sm py-2">
            Marquer comme notifiée
          </button>
        </form>
        {message && (
          <span className={`text-sm ${message.type === "error" ? "text-red-600" : "text-brand-800"}`}>
            {message.text}
          </span>
        )}
      </div>
    </div>
  );
}
