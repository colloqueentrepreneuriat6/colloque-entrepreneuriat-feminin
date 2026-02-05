'use client';

import { useState } from 'react';

interface EditPropositionFormProps {
  propositionId: string;
  initialTitre: string;
  initialAuteurNom: string;
  initialAuteurEmail: string;
  initialDocumentUrl: string;
  onSave: (data: {
    titre: string;
    auteur_nom: string;
    auteur_email: string;
    document_url: string;
  }) => void;
  onCancel: () => void;
}

export function EditPropositionForm({
  propositionId,
  initialTitre,
  initialAuteurNom,
  initialAuteurEmail,
  initialDocumentUrl,
  onSave,
  onCancel,
}: EditPropositionFormProps) {
  const [formData, setFormData] = useState({
    titre: initialTitre,
    auteur_nom: initialAuteurNom,
    auteur_email: initialAuteurEmail,
    document_url: initialDocumentUrl,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSave(formData);
    } catch (error) {
      console.error('Erreur lors de la modification:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-premium max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-heading text-xl font-semibold text-secondary-900">
            Modifier la proposition
          </h3>
          <button
            onClick={onCancel}
            className="p-2 text-secondary-400 hover:text-secondary-600 rounded-lg hover:bg-secondary-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="titre" className="block text-body text-sm font-medium text-secondary-700 mb-2">
              Titre de la proposition *
            </label>
            <input
              type="text"
              id="titre"
              name="titre"
              value={formData.titre}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              placeholder="Entrez le titre de la proposition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="auteur_nom" className="block text-body text-sm font-medium text-secondary-700 mb-2">
                Nom de l'auteur(e) *
              </label>
              <input
                type="text"
                id="auteur_nom"
                name="auteur_nom"
                value={formData.auteur_nom}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                placeholder="Nom complet"
              />
            </div>

            <div>
              <label htmlFor="auteur_email" className="block text-body text-sm font-medium text-secondary-700 mb-2">
                Email de l'auteur(e) *
              </label>
              <input
                type="email"
                id="auteur_email"
                name="auteur_email"
                value={formData.auteur_email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                placeholder="email@exemple.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="document_url" className="block text-body text-sm font-medium text-secondary-700 mb-2">
              URL du document (optionnel)
            </label>
            <input
              type="url"
              id="document_url"
              name="document_url"
              value={formData.document_url}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-secondary-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              placeholder="https://exemple.com/document.pdf"
            />
            <p className="text-xs text-secondary-500 mt-1">
              Laissez vide si le document n'est pas hébergé en ligne
            </p>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 btn-primary"
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
