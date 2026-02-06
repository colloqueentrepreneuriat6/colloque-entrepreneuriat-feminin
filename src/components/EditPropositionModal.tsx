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
      console.log('Chargement de la proposition:', propositionId);
      const response = await fetch(`/api/propositions/${propositionId}`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement de la proposition');
      }
      
      const data = await response.json();
      console.log('Données reçues:', data);
      
      setFormData({
        titre: data.titre || '',
        auteur_nom: data.auteur_nom || '',
        auteur_email: data.auteur_email || '',
        document_url: data.document_url || '',
        statut: data.statut || ''
      });
      
      console.log('FormData mis à jour:', {
        titre: data.titre || '',
        auteur_nom: data.auteur_nom || '',
        auteur_email: data.auteur_email || '',
        document_url: data.document_url || '',
        statut: data.statut || ''
      });
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
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
    const { name, value } = e.target;
    console.log(`Changement du champ ${name}:`, value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Fonction pour fermer la modale
  const handleClose = () => {
    console.log('Fermeture de la modale');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" style={{ zIndex: 99999 }}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4" style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header avec bouton fermer */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">
            Modifier la proposition
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            type="button"
            style={{ position: 'relative', zIndex: 100000 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
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
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {!loading && (
            <form id="edit-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la proposition *
                </label>
                <input
                  id="titre"
                  name="titre"
                  type="text"
                  value={formData.titre}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                  placeholder="Entrez le titre de la proposition"
                  required
                />
                {formData.titre && (
                  <p className="text-xs text-green-600 mt-1">✓ Titre chargé: {formData.titre}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'auteur
                  </label>
                  <input
                    id="auteur_nom"
                    name="auteur_nom"
                    type="text"
                    value={formData.auteur_nom}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                    placeholder="Nom complet"
                  />
                  {formData.auteur_nom && (
                    <p className="text-xs text-green-600 mt-1">✓ Auteur: {formData.auteur_nom}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email de l'auteur
                  </label>
                  <input
                    id="auteur_email"
                    name="auteur_email"
                    type="email"
                    value={formData.auteur_email}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                    placeholder="email@exemple.com"
                  />
                  {formData.auteur_email && (
                    <p className="text-xs text-green-600 mt-1">✓ Email: {formData.auteur_email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL du document
                </label>
                <input
                  id="document_url"
                  name="document_url"
                  type="url"
                  value={formData.document_url}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                  placeholder="https://exemple.com/document.pdf"
                />
                {formData.document_url && (
                  <p className="text-xs text-green-600 mt-1">✓ URL: {formData.document_url}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Statut
                </label>
                <select
                  id="statut"
                  name="statut"
                  value={formData.statut}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none"
                >
                  <option value="nouvelle">Nouvelle</option>
                  <option value="attribuee">Attribuée</option>
                  <option value="evaluee">Évaluée</option>
                  <option value="notifiee">Notifiée</option>
                </select>
                {formData.statut && (
                  <p className="text-xs text-green-600 mt-1">✓ Statut: {formData.statut}</p>
                )}
              </div>
            </form>
          )}
        </div>

        {/* Footer avec boutons - TOUJOURS VISIBLE */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0" style={{ position: 'sticky', bottom: 0, zIndex: 100001 }}>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
              disabled={loading}
              style={{ position: 'relative', zIndex: 100002 }}
            >
              Annuler
            </button>
            <button
              type="submit"
              form="edit-form"
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              disabled={loading}
              style={{ position: 'relative', zIndex: 100002 }}
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
        </div>
      </div>
    </div>
  );
}
