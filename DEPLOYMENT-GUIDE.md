# 🚀 Instructions de déploiement sur GitHub

## Étape 1 : Créer le dépôt GitHub

1. Allez sur [github.com](https://github.com) et connectez-vous
2. Cliquez sur "New repository" (ou "Nouveau dépôt")
3. Nom du dépôt : `colloque-entrepreneuriat-feminin`
4. Description : `Plateforme de gestion pour le Colloque National sur l'Entrepreneuriat Féminin`
5. Choisissez "Public" ou "Private" selon vos préférences
6. **NE COCHEZ PAS** "Add a README file" (nous en avons déjà un)
7. Cliquez sur "Create repository"

## Étape 2 : Connecter votre local au dépôt distant

```bash
# Ajouter le dépôt distant (remplacez VOTRE_USERNAME)
git remote add origin https://github.com/VOTRE_USERNAME/colloque-entrepreneuriat-feminin.git

# Renommer la branche master en main (recommandé par GitHub)
git branch -M main

# Pousser le code vers GitHub
git push -u origin main
```

## Étape 3 : Déployer sur Vercel (Option recommandée)

### 3.1 Créer le compte Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur "Sign Up"
3. Choisissez "Continue with GitHub" et autorisez l'accès

### 3.2 Importer le projet
1. Sur le dashboard Vercel, cliquez sur "Add New..." → "Project"
2. Cherchez votre dépôt `colloque-entrepreneuriat-feminin`
3. Cliquez sur "Import"

### 3.3 Configurer les variables d'environnement
Dans la configuration du projet Vercel, ajoutez ces variables :

```
NEXTAUTH_URL=https://votre-domaine.vercel.app
NEXTAUTH_SECRET=votre_secret_aleatoire_32_caracteres_min
SUPABASE_URL=votre_url_supabase
SUPABASE_ANON_KEY=votre_cle_anon_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_supabase
```

### 3.4 Générer un NEXTAUTH_SECRET
```bash
# Dans votre terminal
openssl rand -base64 32
```

### 3.5 Déployer
1. Cliquez sur "Deploy"
2. Attendez le déploiement (2-3 minutes)
3. Votre site sera disponible à l'URL fournie par Vercel

## Étape 4 : Configurer Supabase

### 4.1 Créer le projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte
3. Cliquez sur "New Project"
4. Choisissez une organisation
5. Nom du projet : `colloque-ef`
6. Mot de passe de la base : générez un mot de passe sécurisé
7. Région : choisissez la plus proche (Europe)
8. Cliquez sur "Create new project"

### 4.2 Configurer la base de données
1. Dans le dashboard Supabase, allez dans "SQL Editor"
2. Cliquez sur "New query"
3. Copiez-collez le contenu de `supabase/schema.sql`
4. Cliquez sur "Run" pour exécuter le schéma

### 4.3 Récupérer les clés
Dans Settings → API :
- **Project URL** → `SUPABASE_URL`
- **anon public** → `SUPABASE_ANON_KEY`
- **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

## Étape 5 : Mettre à jour les variables Vercel

1. Retournez sur votre projet Vercel
2. Allez dans "Settings" → "Environment Variables"
3. Ajoutez/mettez à jour toutes les variables avec vos vraies clés Supabase
4. Redéployez automatiquement

## 🎉 Votre site est en ligne !

Votre plateforme sera accessible à l'URL :
`https://votre-projet.vercel.app`

## 🔗 Liens utiles

- **Votre dépôt GitHub** : `https://github.com/VOTRE_USERNAME/colloque-entrepreneuriat-feminin`
- **Documentation Vercel** : `https://vercel.com/docs`
- **Documentation Supabase** : `https://supabase.com/docs`

## 📞 Support en cas de problème

Si vous rencontrez des difficultés :
1. Vérifiez que toutes les variables d'environnement sont correctes
2. Consultez les logs de déploiement sur Vercel
3. Vérifiez que la base de données Supabase est bien configurée

---

✅ **Félicitations !** Votre plateforme de colloque est maintenant déployée et fonctionnelle !
