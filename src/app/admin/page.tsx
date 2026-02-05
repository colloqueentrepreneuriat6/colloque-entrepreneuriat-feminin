import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Header } from "@/components/Header";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import { getReviewers } from "@/lib/reviewers";
import { AddPropositionForm } from "./AddPropositionForm";
import { AssignForm } from "./AssignForm";
import { NotifyAuthor } from "./NotifyAuthor";
import { ServerPropositionActions } from "@/components/ServerPropositionActions";
import type { Proposition } from "@/types/database";

const statutLabels: Record<string, string> = {
  nouvelle: "Nouvelle",
  attribuee: "Attribuée",
  evaluee: "Évaluée",
  notifiee: "Notifiée",
};

const statutStyles: Record<string, string> = {
  nouvelle: "bg-amber-100 text-amber-800 border-amber-200",
  attribuee: "bg-orange-100 text-orange-800 border-orange-200",
  evaluee: "bg-purple-100 text-purple-800 border-purple-200",
  notifiee: "bg-green-100 text-green-800 border-green-200",
};

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;

  if (!session || role !== "admin") {
    redirect("/connexion");
  }

  const supabase = supabaseAdmin;
  const reviewers = getReviewers();

  let propositions: Proposition[] = [];
  let attributionsByProposition: Record<string, number> = {};
  let evaluationsByProposition: Record<string, { decision: string; remarques: string | null }[]> = {};

  if (supabase) {
    const { data: props } = await supabase
      .from("propositions")
      .select("id, titre, auteur_nom, auteur_email, document_url, statut, created_at")
      .order("created_at", { ascending: false });
    propositions = props ?? [];

    const { data: attrs } = await supabase.from("attributions").select("proposition_id");
    if (attrs) {
      attrs.forEach((a) => {
        attributionsByProposition[a.proposition_id] =
          (attributionsByProposition[a.proposition_id] ?? 0) + 1;
      });
    }

    const { data: evals } = await supabase
      .from("evaluations")
      .select("proposition_id, decision, remarques")
      .order("submitted_at", { ascending: true });
    if (evals) {
      evals.forEach((e) => {
        if (!evaluationsByProposition[e.proposition_id])
          evaluationsByProposition[e.proposition_id] = [];
        evaluationsByProposition[e.proposition_id].push({
          decision: e.decision,
          remarques: e.remarques,
        });
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-luxury-cream via-white to-luxury-pearl">
      <Header />
      <main className="flex-1 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-heading text-xs font-semibold uppercase tracking-widest text-orange-600 mb-1">
                Administration
              </p>
              <h1 className="text-display text-3xl font-bold text-secondary-900">
                Espace administrateur
              </h1>
              <p className="text-body text-sm text-secondary-600 mt-1">
                Gérez les propositions et le comité scientifique
              </p>
            </div>
            <Link
              href="/"
              className="btn-secondary"
            >
              ← Accueil
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-xs font-semibold text-orange-600 uppercase tracking-wide">Total</p>
                  <p className="text-display text-3xl font-bold text-orange-900">{propositions.length}</p>
                  <p className="text-body text-xs text-orange-700 mt-1">Propositions</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-xs font-semibold text-amber-600 uppercase tracking-wide">Nouvelles</p>
                  <p className="text-display text-3xl font-bold text-amber-900">{propositions.filter(p => p.statut === 'nouvelle').length}</p>
                  <p className="text-body text-xs text-amber-700 mt-1">À traiter</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-xs font-semibold text-purple-600 uppercase tracking-wide">En cours</p>
                  <p className="text-display text-3xl font-bold text-purple-900">{propositions.filter(p => p.statut === 'attribuee').length}</p>
                  <p className="text-body text-xs text-purple-700 mt-1">En évaluation</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-xs font-semibold text-green-600 uppercase tracking-wide">Terminées</p>
                  <p className="text-display text-3xl font-bold text-green-900">{propositions.filter(p => p.statut === 'notifiee').length}</p>
                  <p className="text-body text-xs text-green-700 mt-1">Notifiées</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {propositions.filter(p => p.statut === 'nouvelle').length > 0 && (
            <div className="card p-4 mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900">⚠️ Actions requises</h3>
                  <p className="text-sm text-amber-800 mt-1">
                    Vous avez <strong>{propositions.filter(p => p.statut === 'nouvelle').length}</strong> proposition{propositions.filter(p => p.statut === 'nouvelle').length > 1 ? 's' : ''} nouvelle{propositions.filter(p => p.statut === 'nouvelle').length > 1 ? 's' : ''} en attente d'attribution. Veuillez assigner 2 rapporteurs pour chaque proposition.
                  </p>
                </div>
              </div>
            </div>
          )}

          {propositions.filter(p => p.statut === 'evaluee').length > 0 && (
            <div className="card p-4 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-blue-900">📧 Notifications à envoyer</h3>
                  <p className="text-sm text-blue-800 mt-1">
                    <strong>{propositions.filter(p => p.statut === 'evaluee').length}</strong> proposition{propositions.filter(p => p.statut === 'evaluee').length > 1 ? 's' : ''} évaluée{propositions.filter(p => p.statut === 'evaluee').length > 1 ? 's' : ''} en attente de notification aux auteurs.
                  </p>
                </div>
              </div>
            </div>
          )}

          {!supabase && (
            <div className="card p-6 mb-8 bg-gradient-to-r from-red-50 to-pink-50 border-red-300 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-red-900">⚠️ Configuration requise</h3>
                  <p className="text-sm text-red-800 mt-1">
                    Configurez Supabase (voir <code className="bg-red-100 px-1 rounded">.env.local</code> et{" "}
                    <code className="bg-red-100 px-1 rounded">supabase/README.md</code>) pour gérer les propositions.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="card p-4 mb-8 bg-slate-50 border-slate-200">
            <p className="text-body text-sm text-slate-700">
              <strong>Réception des propositions :</strong> les participants envoient leurs propositions à{" "}
              <strong className="text-orange-800">colloque.entrepreneuriat6@gmail.com</strong> (document Word en pièce jointe) ou via le{" "}
              <a href="/soumettre" className="text-orange-800 hover:underline">formulaire en ligne</a>. Pour chaque mail reçu, ajoutez une proposition ci-dessous avec l'intitulé et les coordonnées de l'auteur(e). Vous pouvez aussi déposer le document en ligne (lien) si vous l'hébergez.
            </p>
          </div>

          <section className="mb-10">
            <div className="card-elevated overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-200/60 bg-gradient-to-r from-orange-50 to-purple-50">
                <h2 className="text-display text-xl font-bold text-slate-900 mb-2">
                  Ajouter une proposition
                </h2>
                <p className="text-body text-sm text-slate-600">
                  Enregistrez manuellement une proposition reçue par email
                </p>
              </div>
              <div className="p-8">
                <AddPropositionForm />
              </div>
            </div>
          </section>

          <section className="card-elevated overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-display text-xl font-bold text-slate-900 mb-2">
                    Propositions reçues
                  </h2>
                  <p className="text-body text-sm text-slate-600">
                    Gérez les propositions et attribuez-les aux rapporteurs
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {propositions.length} totale{propositions.length > 1 ? 's' : ''}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    {propositions.filter(p => p.statut === 'nouvelle').length} nouvelle{propositions.filter(p => p.statut === 'nouvelle').length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
            <div className="divide-y divide-slate-200/40">
              {propositions.length === 0 && (
                <div className="px-8 py-16 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-heading text-lg font-semibold text-slate-900 mb-2">
                    Aucune proposition
                  </h3>
                  <p className="text-body text-sm text-slate-600 mb-4">
                    Commencez par ajouter une proposition manuellement ou attendez les soumissions.
                  </p>
                </div>
              )}
              {propositions.map((p) => (
                <div key={p.id} className="px-8 py-6 hover:bg-slate-50/30 transition-colors duration-200">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-heading text-lg font-semibold text-slate-900 truncate">
                              {p.titre}
                            </h3>
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${statutStyles[p.statut] ?? "bg-slate-100 text-slate-800 border-slate-200"}`}
                            >
                              {statutLabels[p.statut] ?? p.statut}
                            </span>
                          </div>
                          
                          {(p.auteur_nom || p.auteur_email) && (
                            <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              <span>
                                {p.auteur_nom}
                                {p.auteur_nom && p.auteur_email && " • "}
                                {p.auteur_email}
                              </span>
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Reçue le{" "}
                            {new Date(p.created_at).toLocaleDateString("fr-FR", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                      
                      {p.statut === "nouvelle" && (
                        <div className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                          <AssignForm
                            propositionId={p.id}
                            propositionTitre={p.titre}
                            reviewers={reviewers}
                          />
                        </div>
                      )}
                      
                      {(p.statut === "attribuee" || p.statut === "evaluee" || p.statut === "notifiee") &&
                        (attributionsByProposition[p.id] ?? 0) >= 2 && (
                          <div className="mt-4 flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            2 rapporteurs assignés (évaluation en aveugle)
                          </div>
                        )}
                      
                      {p.document_url && (
                        <div className="mt-4">
                          <a
                            href={p.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium bg-orange-50 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ouvrir le document
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-shrink-0">
                      <ServerPropositionActions
                        propositionId={p.id}
                        propositionTitre={p.titre}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 card-elevated overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-200/60 bg-gradient-to-r from-slate-50 to-white">
              <h2 className="text-display text-xl font-bold text-slate-900 mb-2">
                Évaluations reçues — Notifier les auteurs
              </h2>
              <p className="text-body text-sm text-slate-600 mt-0.5">
                Consultez les avis et décisions des rapporteurs, puis notifiez l'auteur(e) par email (depuis colloque.entrepreneuriat6@gmail.com ou votre client mail) et marquez la proposition comme notifiée.
              </p>
            </div>
            <div className="divide-y divide-slate-200/40">
              {propositions.filter((p) => p.statut === "evaluee").length === 0 && (
                <div className="px-8 py-16 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-heading text-lg font-semibold text-slate-900 mb-2">
                    Aucune proposition évaluée en attente de notification
                  </h3>
                  <p className="text-body text-sm text-slate-600">
                    Dès que les deux rapporteurs auront rendu leur avis, les propositions apparaîtront ici.
                  </p>
                </div>
              )}
              {propositions
                .filter((p) => p.statut === "evaluee")
                .map((p) => (
                  <div key={p.id} className="px-8 py-6">
                    <h3 className="text-heading text-lg font-semibold text-slate-900">{p.titre}</h3>
                    {p.auteur_email && (
                      <p className="mt-1 text-sm text-slate-600">
                        Auteur(e) : {p.auteur_nom ?? "—"} — {p.auteur_email}
                      </p>
                    )}
                    {evaluationsByProposition[p.id]?.length === 2 && (
                      <NotifyAuthor
                        propositionId={p.id}
                        titre={p.titre}
                        auteurEmail={p.auteur_email}
                        evaluations={evaluationsByProposition[p.id]}
                      />
                    )}
                  </div>
                ))}
              {propositions.filter((p) => p.statut === "notifiee").length > 0 && (
                <div className="px-8 py-6 border-t border-slate-200 bg-slate-50/50">
                  <p className="text-xs font-medium text-slate-600 mb-2">Déjà notifiées</p>
                  <ul className="text-body text-sm text-slate-600 space-y-1">
                    {propositions
                      .filter((p) => p.statut === "notifiee")
                      .map((p) => (
                        <li key={p.id}>
                          {p.titre}
                          {p.auteur_email && ` — ${p.auteur_email}`}
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
