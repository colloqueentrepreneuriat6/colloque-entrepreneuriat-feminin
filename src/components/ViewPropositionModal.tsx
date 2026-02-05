'use client';

import React, { useState } from 'react';

interface ViewPropositionModalProps {
  propositionId: string;
  propositionTitre: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewPropositionModal({ propositionId, propositionTitre, isOpen, onClose }: ViewPropositionModalProps) {
  const [proposition, setProposition] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProposition = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching proposition with ID:', propositionId);
      const response = await fetch(`/api/propositions/${propositionId}`);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Erreur HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Proposition data:', data);
      setProposition(data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && propositionId) {
      fetchProposition();
    }
  }, [isOpen, propositionId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-premium max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200/60 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-display text-xl font-bold text-slate-900">
              Détails de la proposition
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            </div>
          )}

          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 mb-6">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-body text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {proposition && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl p-6 border border-orange-200">
                <h3 className="text-heading text-lg font-semibold text-slate-900 mb-4">
                  {proposition.titre}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Auteur</p>
                    <p className="text-body text-sm text-slate-900">{proposition.auteur_nom || 'Non spécifié'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-body text-sm text-slate-900">{proposition.auteur_email || 'Non spécifié'}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Statut</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                      proposition.statut === 'nouvelle' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                      proposition.statut === 'attribuee' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                      proposition.statut === 'evaluee' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                      proposition.statut === 'notifiee' ? 'bg-green-100 text-green-800 border-green-200' :
                      'bg-slate-100 text-slate-800 border-slate-200'
                    }`}>
                      {proposition.statut === 'nouvelle' ? 'Nouvelle' :
                       proposition.statut === 'attribuee' ? 'Attribuée' :
                       proposition.statut === 'evaluee' ? 'Évaluée' :
                       proposition.statut === 'notifiee' ? 'Notifiée' :
                       proposition.statut}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Date de réception</p>
                    <p className="text-body text-sm text-slate-900">
                      {new Date(proposition.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {proposition.document_url && (
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-body text-sm font-medium text-slate-900">Document associé</p>
                        <p className="text-xs text-slate-500">Cliquez pour ouvrir le fichier</p>
                      </div>
                    </div>
                    <a
                      href={proposition.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary px-4 py-2"
                    >
                      Ouvrir
                    </a>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  onClick={onClose}
                  className="btn-secondary px-6"
                >
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
