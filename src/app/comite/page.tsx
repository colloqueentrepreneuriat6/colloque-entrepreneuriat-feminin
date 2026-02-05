import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { Header } from "@/components/Header";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase/server";
import { EvaluationForm } from "./EvaluationForm";
import type { Proposition } from "@/types/database";
import type { Evaluation } from "@/types/database";

export default async function ComitePage() {
  const session = await getServerSession(authOptions);
  const role = (session?.user as { role?: string })?.role;
  const userId = (session?.user as { id?: string })?.id;

  if (!session || role !== "reviewer") {
    redirect("/connexion");
  }

  let assignedPropositions: (Proposition & { evaluation?: Evaluation | null })[] = [];
  const supabase = supabaseAdmin;

  if (supabase && userId) {
    const { data: attributions } = await supabase
      .from("attributions")
      .select("proposition_id")
      .eq("rapporteur_id", userId);

    if (attributions?.length) {
      const ids = attributions.map((a) => a.proposition_id);
      const { data: propositions } = await supabase
        .from("propositions")
        .select("id, titre, auteur_nom, auteur_email, document_url, statut, created_at")
        .in("id", ids)
        .order("created_at", { ascending: false });

      const { data: evaluations } = await supabase
        .from("evaluations")
        .select("id, proposition_id, decision, remarques, submitted_at")
        .eq("rapporteur_id", userId);

      const evalByProp = (evaluations ?? []).reduce(
        (acc, e) => {
          acc[e.proposition_id] = e;
          return acc;
        },
        {} as Record<string, Evaluation>,
      );

      assignedPropositions = (propositions ?? []).map((p) => ({
        ...p,
        evaluation: evalByProp[p.id] ?? null,
      }));
    }
  }

  const decisionLabels: Record<string, string> = {
    accepte: "Accepté",
    refuse: "Refusé",
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-luxury-cream via-white to-luxury-pearl">
      <Header />
      <main className="flex-1 px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-heading text-xs font-semibold uppercase tracking-widest text-accent-600 mb-1">
                Comité scientifique
              </p>
              <h1 className="text-display text-3xl font-bold text-secondary-900">
                Mon espace rapporteur
              </h1>
              <p className="text-body text-sm text-secondary-600 mt-1">
                Connecté en tant que {session.user?.name}
              </p>
            </div>
            <Link href="/" className="btn-secondary">
              ← Accueil
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-xs font-semibold text-accent-600 uppercase tracking-wide">Total</p>
                  <p className="text-display text-3xl font-bold text-accent-900">{assignedPropositions.length}</p>
                  <p className="text-body text-xs text-accent-700 mt-1">Propositions</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-xs font-semibold text-warning-600 uppercase tracking-wide">À faire</p>
                  <p className="text-display text-3xl font-bold text-warning-900">{assignedPropositions.filter(p => !p.evaluation).length}</p>
                  <p className="text-body text-xs text-warning-700 mt-1">En attente</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-warning-500 to-warning-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="card-luxury p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-body text-xs font-semibold text-success-600 uppercase tracking-wide">Terminées</p>
                  <p className="text-display text-3xl font-bold text-success-900">{assignedPropositions.filter(p => p.evaluation).length}</p>
                  <p className="text-body text-xs text-success-700 mt-1">Évaluées</p>
                </div>
                <div className="w-14 h-14 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {assignedPropositions.filter(p => !p.evaluation).length > 0 && (
            <div className="card p-4 mb-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-300 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900">⚠️ Évaluations en attente</h3>
                  <p className="text-sm text-amber-800 mt-1">
                    Vous avez <strong>{assignedPropositions.filter(p => !p.evaluation).length}</strong> proposition{assignedPropositions.filter(p => !p.evaluation).length > 1 ? 's' : ''} à évaluer. Merci de compléter vos évaluations dès que possible.
                  </p>
                </div>
              </div>
            </div>
          )}

          {assignedPropositions.filter(p => p.evaluation).length > 0 && (
            <div className="card p-4 mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-300 shadow-lg">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-900">✅ Évaluations complétées</h3>
                  <p className="text-sm text-green-800 mt-1">
                    Vous avez évalué <strong>{assignedPropositions.filter(p => p.evaluation).length}</strong> proposition{assignedPropositions.filter(p => p.evaluation).length > 1 ? 's' : ''}. Merci pour votre contribution !
                  </p>
                </div>
              </div>
            </div>
          )}

          <section className="card-elevated overflow-hidden">
            <div className="px-8 py-6 border-b border-secondary-200/60 bg-gradient-to-r from-accent-50 to-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-display text-xl font-bold text-secondary-900 mb-2">
                    Propositions à évaluer
                  </h2>
                  <p className="text-body text-sm text-secondary-600">
                    Les propositions qui vous sont attribuées apparaissent ci-dessous (évaluation en aveugle)
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-800">
                    {assignedPropositions.length} totale{assignedPropositions.length > 1 ? 's' : ''}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                    {assignedPropositions.filter(p => !p.evaluation).length} à évaluer
                  </span>
                </div>
              </div>
            </div>
            <div className="divide-y divide-secondary-200/40">
              {assignedPropositions.length === 0 && (
                <div className="px-8 py-16 text-center">
                  <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-heading text-lg font-semibold text-secondary-900 mb-2">
                    Aucune proposition assignée
                  </h3>
                  <p className="text-body text-sm text-secondary-600">
                    L'administrateur vous attribuera des propositions dès qu'elles seront disponibles.
                  </p>
                </div>
              )}
              {assignedPropositions.map((p) => (
                <div key={p.id} className="px-8 py-6 hover:bg-secondary-50/30 transition-colors duration-200">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent-100 to-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-heading text-lg font-semibold text-secondary-900 truncate">
                          {p.titre}
                        </h3>
                        {p.evaluation && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800 border border-success-200">
                            Évaluée
                          </span>
                        )}
                      </div>
                      
                      {p.document_url && (
                        <div className="mb-4">
                          <a
                            href={p.document_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-accent-600 hover:text-accent-700 font-medium bg-accent-50 px-4 py-2 rounded-lg hover:bg-accent-100 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            Ouvrir le document
                          </a>
                        </div>
                      )}
                      
                      {!p.document_url && (
                        <div className="mb-4 flex items-center gap-2 text-xs text-warning-600 bg-warning-50 px-3 py-2 rounded-lg border border-warning-200">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Aucun document joint
                        </div>
                      )}
                      
                      {p.evaluation ? (
                        <div className="p-4 rounded-xl bg-gradient-to-br from-success-50 to-emerald-50 border border-success-200">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <div>
                              <p className="text-heading text-sm font-semibold text-success-900">Votre évaluation</p>
                              <p className="text-body text-xs text-success-700">
                                Envoyée le {new Date(p.evaluation.submitted_at).toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-body text-sm font-medium text-secondary-700">Décision :</span>
                              <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                                p.evaluation.decision === 'accepte' 
                                  ? 'bg-success-100 text-success-800' 
                                  : 'bg-danger-100 text-danger-800'
                              }`}>
                                {decisionLabels[p.evaluation.decision] ?? p.evaluation.decision}
                              </span>
                            </div>
                            
                            {p.evaluation.remarques && (
                              <div>
                                <p className="text-body text-sm font-medium text-secondary-700 mb-1">Remarques :</p>
                                <p className="text-body text-sm text-secondary-600 whitespace-pre-wrap bg-white p-3 rounded-lg border border-secondary-200">
                                  {p.evaluation.remarques}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-gradient-to-br from-warning-50 to-orange-50 border border-warning-200">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-warning-100 rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                              </svg>
                            </div>
                            <p className="text-heading text-sm font-semibold text-warning-900">
                              Évaluation requise
                            </p>
                          </div>
                          <EvaluationForm propositionId={p.id} propositionTitre={p.titre} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
