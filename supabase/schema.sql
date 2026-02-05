-- Schéma pour le colloque : propositions, attributions, évaluations
-- À exécuter dans Supabase : SQL Editor → New query → coller et Run

-- Table des propositions (reçues par mail / saisies par l'admin)
CREATE TABLE IF NOT EXISTS propositions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titre TEXT NOT NULL,
  auteur_nom TEXT,
  auteur_email TEXT,
  document_url TEXT,
  statut TEXT NOT NULL DEFAULT 'nouvelle' CHECK (statut IN ('nouvelle', 'attribuee', 'evaluee', 'notifiee')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table des attributions (chaque proposition → 2 rapporteurs, en aveugle)
CREATE TABLE IF NOT EXISTS attributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposition_id UUID NOT NULL REFERENCES propositions(id) ON DELETE CASCADE,
  rapporteur_id TEXT NOT NULL,
  assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(proposition_id, rapporteur_id)
);

-- Table des évaluations (remarques + décision par rapporteur)
CREATE TABLE IF NOT EXISTS evaluations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  proposition_id UUID NOT NULL REFERENCES propositions(id) ON DELETE CASCADE,
  rapporteur_id TEXT NOT NULL,
  decision TEXT NOT NULL CHECK (decision IN ('accepte', 'refuse')),
  remarques TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(proposition_id, rapporteur_id)
);

-- Index pour les requêtes courantes
CREATE INDEX IF NOT EXISTS idx_attributions_proposition ON attributions(proposition_id);
CREATE INDEX IF NOT EXISTS idx_attributions_rapporteur ON attributions(rapporteur_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_proposition ON evaluations(proposition_id);
CREATE INDEX IF NOT EXISTS idx_evaluations_rapporteur ON evaluations(rapporteur_id);
CREATE INDEX IF NOT EXISTS idx_propositions_statut ON propositions(statut);

-- Politique RLS (Row Level Security) : activer et autoriser tout pour l’instant
-- Tu pourras restreindre par rôle (admin / rapporteur) plus tard
ALTER TABLE propositions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "propositions_allow_all" ON propositions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "attributions_allow_all" ON attributions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "evaluations_allow_all" ON evaluations FOR ALL USING (true) WITH CHECK (true);
