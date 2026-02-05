'use client';

import React, { useState, useEffect } from 'react';

interface EditPropositionModalProps {
  propositionId: string;
  propositionTitre: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditPropositionModal({ propositionId, propositionTitre, isOpen, onClose, onSuccess }: EditPropositionModalProps) {
  const [formData, setFormData] = useState({
    titre: '',
    auteur_nom: '',
    auteur_email: '',
    document_url: '',
    statut: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProposition = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/propositions/${propositionId}`);
      if (!response.ok) {
        throw new Error('Erreur lors du chargement de la proposition');
      }
      const data = await response.json();
      setFormData({
        titre: data.titre || '',
        auteur_nom: data.auteur_nom || '',
        auteur_email: data.auteur_email || '',
        document_url: data.document_url || '',
        statut: data.statut || ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && propositionId) {
      fetchProposition();
    }
  }, [isOpen, propositionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/propositions/${propositionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la mise à jour de la proposition');
      }

      onSuccess();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-premium max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200/60 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-display text-xl font-bold text-slate-900">
              Modifier la proposition
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

          {!loading && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="titre"
                  className="block text-body text-sm font-medium text-slate-700 mb-2"
                >
                  Titre de la proposition *
                </label>
                <input
                  id="titre"
                  name="titre"
                  type="text"
                  value={formData.titre}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-200"
                  placeholder="Entrez le titre de la proposition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="auteur_nom"
                    className="block text-body text-sm font-medium text-slate-700 mb-2"
                  >
                    Nom de l'auteur
                  </label>
                  <input
                    id="auteur_nom"
                    name="auteur_nom"
                    type="text"
                    value={formData.auteur_nom}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-200"
                    placeholder="Nom complet"
                  />
                </div>

                <div>
                  <label
                    htmlFor="auteur_email"
                    className="block text-body text-sm font-medium text-slate-700 mb-2"
                  >
                    Email de l'auteur
                  </label>
                  <input
                    id="auteur_email"
                    name="auteur_email"
                    type="email"
                    value={formData.auteur_email}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-200"
                    placeholder="email@exemple.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="document_url"
                  className="block text-body text-sm font-medium text-slate-700 mb-2"
                >
                  URL du document
                </label>
                <input
                  id="document_url"
                  name="document_url"
                  type="url"
                  value={formData.document_url}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-200"
                  placeholder="https://exemple.com/document.pdf"
                />
              </div>

              <div>
                <label
                  htmlFor="statut"
                  className="block text-body text-sm font-medium text-slate-700 mb-2"
                >
                  Statut
                </label>
                <select
                  id="statut"
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all duration-200"
                >
                  <option value="nouvelle">Nouvelle</option>
                  <option value="attribuee">Attribuée</option>
                  <option value="evaluee">Évaluée</option>
                  <option value="notifiee">Notifiée</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn-secondary px-6"
                  disabled={loading}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary px-6"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8a8 8 0 018 0z" />
                      </svg>
                      Enregistrement...
                    </span>
                  ) : (
                    'Enregistrer les modifications'
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
