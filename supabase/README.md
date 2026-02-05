# Supabase – Étape 3

## 1. Créer un projet Supabase (gratuit)

1. Va sur **https://supabase.com** et crée un compte si besoin.
2. **New project** → choisis un nom (ex. `colloque-ef`), un mot de passe pour la base, une région.
3. Attends que le projet soit créé.

## 2. Exécuter le schéma SQL

1. Dans le dashboard Supabase : **SQL Editor** (menu de gauche).
2. **New query**.
3. Ouvre le fichier **`supabase/schema.sql`** à la racine du projet, copie tout son contenu, colle-le dans l’éditeur SQL.
4. Clique sur **Run** (ou Ctrl+Entrée).
5. Tu dois voir « Success » : les tables `propositions`, `attributions` et `evaluations` sont créées.

## 3. Récupérer les clés API

1. **Settings** (icône engrenage) → **API**.
2. Tu y trouveras :
   - **Project URL** → à mettre dans `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → dans `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** (cliquer sur « Reveal ») → dans `SUPABASE_SERVICE_ROLE_KEY`

## 4. Configurer `.env.local`

Dans ton fichier **`.env.local`** à la racine du projet, ajoute (en remplaçant par tes vraies valeurs) :

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Redémarre le serveur (`npm run dev`) après modification de `.env.local`.

## 5. Bucket Storage pour les documents (optionnel)

Pour que les participants puissent déposer un document Word depuis le formulaire en ligne :

1. Dans le dashboard Supabase : **Storage** (menu de gauche).
2. **New bucket** → nom : **`documents`**.
3. Coche **Public bucket** (pour que les rapporteurs puissent ouvrir les liens des documents).
4. Crée le bucket. Les fichiers envoyés via le formulaire « Soumettre une proposition » y seront enregistrés.
