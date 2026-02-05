# 🎓 Colloque National sur l'Entrepreneuriat Féminin

Plateforme de gestion complète pour le colloque national sur l'entrepreneuriat féminin en Algérie.

## 🌟 Fonctionnalités

### 👥 Gestion des utilisateurs
- **22 membres du comité scientifique** avec rôles définis
- **Présidente du comité** avec accès administrateur
- **Reviewers** pour l'évaluation des propositions

### 📋 Gestion des propositions
- **Soumission** en ligne des propositions
- **Évaluation** par les membres du comité
- **Assignation** automatique aux reviewers
- **Notification** automatique des auteurs

### 🎨 Design professionnel
- **Interface luxueuse** et moderne
- **Responsive design** pour tous appareils
- **Favicon personnalisée**
- **Charte graphique cohérente**

### 🔐 Sécurité
- **Authentification** sécurisée
- **Rôles et permissions** définis
- **Connexion par identifiants** uniquement

## 🚀 Déploiement

### Points à vérifier avant déploiement :

- ✅ **Variables d'environnement à configurer (.env.local)**
- ✅ **Base de données Supabase à créer**
- ✅ **Domaine personnalisé si souhaité**
- ✅ **SSL certificates** (automatique sur Vercel)

### Option 1 : Vercel (Recommandé - Gratuit)
1. Créer un compte sur [vercel.com](https://vercel.com)
2. Connecter votre compte GitHub
3. Importer le dépôt : `https://github.com/VOTRE_USERNAME/colloque-entrepreneuriat-feminin`
4. Configurer les variables d'environnement :
   ```
   NEXTAUTH_URL=https://votre-domaine.vercel.app
   NEXTAUTH_SECRET=votre_secret_securise
   SUPABASE_URL=votre_url_supabase
   SUPABASE_ANON_KEY=votre_cle_supabase
   SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_supabase
   ```

### Option 2 : Netlify (Gratuit)
1. Créer un compte sur [netlify.com](https://netlify.com)
2. Connecter GitHub et importer le dépôt
3. Configurer les variables d'environnement dans les settings
4. Build command : `npm run build`
5. Publish directory : `.next`

### Option 3 : Railway (Gratuit avec limites)
1. Créer un compte sur [railway.app](https://railway.app)
2. Importer depuis GitHub
3. Configurer les variables d'environnement
4. Déployer automatiquement

## 📦 Installation locale

```bash
# Cloner le dépôt
git clone https://github.com/VOTRE_USERNAME/colloque-entrepreneuriat-feminin.git
cd colloque-entrepreneuriat-feminin

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.local.example .env.local
# Éditer .env.local avec vos clés Supabase

# Lancer le développement
npm run dev
```

## 🔧 Configuration Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Exécuter le schéma SQL depuis `supabase/schema.sql`
3. Copier les clés dans `.env.local`
4. Configurer l'authentification si nécessaire

## 👤 Identifiants par défaut

### Présidente du comité
- **Username :** hiderfouzia
- **Password :** admin2024
- **Rôle :** Administrateur

### Membres du comité
- **Username :** [nom+prenom] (ex: ahouarizahir)
- **Password :** comite2024
- **Rôle :** Reviewer

## 📧 Templates d'emails

Les templates d'emails sont disponibles dans le dossier `templates/` :
- `email-membre-comite.html` : Pour les identifiants des membres
- `email-participant.html` : Pour les décisions aux participants
- `contenus-emails.md` : Contenus détaillés et instructions

## 🎯 Structure du projet

```
src/
├── app/                    # Pages Next.js 13+
│   ├── admin/              # Administration
│   ├── comite/             # Espace reviewers
│   ├── connexion/          # Connexion
│   ├── soumettre/          # Soumission propositions
│   └── presentation/       # Page d'accueil
├── components/             # Composants React
├── lib/                   # Utilitaires et auth
├── data/                  # Données statiques
└── types/                 # Types TypeScript

templates/                 # Templates d'emails
public/                    # Fichiers statiques
supabase/                  # Schéma de base de données
```

## 🛠️ Technologies utilisées

- **Frontend :** Next.js 13+, React, TypeScript
- **Styling :** Tailwind CSS
- **Authentification :** NextAuth.js
- **Base de données :** Supabase (PostgreSQL)
- **Déploiement :** Vercel/Netlify/Railway

## 📞 Contact

- **Email :** colloque.entrepreneuriat6@gmail.com
- **Président du comité :** Pr. Hadrbache Bachir
- **Gestionnaire plateforme :** Dr. HIDER Fouzia
- **Université :** Université de Bejaia

## 📄 Licence

Ce projet est propriété du Colloque National sur l'Entrepreneuriat Féminin - Université de Bejaia.

---

🚀 **Prêt à déployer ?** Suivez les instructions ci-dessus pour mettre votre plateforme en ligne en quelques minutes !
