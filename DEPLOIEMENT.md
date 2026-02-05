# Étapes de déploiement du projet

## 1. Préparation du dépôt GitHub

### Initialisation Git
```bash
git init
git add .
git commit -m "Initial commit - Colloque entrepreneuriat féminin"
```

### Création du dépôt
1. Allez sur https://github.com
2. Créez un nouveau dépôt : `colloque-entrepreneuriat-feminin`
3. Copiez l'URL du dépôt
4. Connectez votre dépôt local :
```bash
git remote add origin https://github.com/VOTRE_USERNAME/colloque-entrepreneuriat-feminin.git
git branch -M main
git push -u origin main
```

## 2. Configuration des variables d'environnement

### Créer les fichiers nécessaires
- `.env.local.example` (déjà présent)
- `.env.local` (à créer sur l'hébergeur)

### Variables requises pour l'hébergement :
```
NEXTAUTH_URL=https://votre-domaine.vercel.app
NEXTAUTH_SECRET=cle_secrete_aleatoire
SUPABASE_URL=votre_url_supabase
SUPABASE_ANON_KEY=votre_cle_anon_supabase
SUPABASE_SERVICE_ROLE_KEY=votre_cle_service_supabase
```

## 3. Déploiement sur Vercel (Recommandé)

### Méthode 1 : Via l'interface web
1. Allez sur https://vercel.com
2. Connectez-vous avec GitHub
3. Importez votre dépôt `colloque-entrepreneuriat-feminin`
4. Vercel détectera automatiquement Next.js
5. Configurez les variables d'environnement
6. Cliquez sur "Deploy"

### Méthode 2 : Via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel
```

## 4. Configuration de Supabase pour l'hébergement

1. Allez sur https://supabase.com
2. Créez un nouveau projet
3. Dans Settings > API :
   - Copiez l'URL et les clés
   - Ajoutez-les aux variables d'environnement Vercel
4. Configurez les tables SQL (utilisez le fichier `supabase/schema.sql`)

## 5. Tests après déploiement

1. Vérifiez que le site s'affiche correctement
2. Testez la connexion des utilisateurs
3. Testez l'ajout de propositions
4. Vérifiez les notifications par email

## 6. Maintenance

### Mises à jour
```bash
git add .
git commit -m "Description des modifications"
git push origin main
```
Vercel déploiera automatiquement les modifications.

### Surveillance
- Vercel fournit des analytics et logs
- Surveillez les erreurs dans le dashboard Vercel
- Vérifiez l'utilisation des ressources Supabase

## 7. Personnalisation du domaine (Optionnel)

### Avec Vercel
1. Dans le dashboard Vercel > Settings > Domains
2. Ajoutez votre domaine personnalisé
3. Configurez les DNS selon les instructions Vercel

### Configuration DNS typique
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

## 8. Sécurité

### Bonnes pratiques
- Ne jamais exposer les clés Supabase dans le code
- Utiliser des variables d'environnement
- Activer l'authentification à deux facteurs sur GitHub
- Surveiller les accès aux comptes

### Sauvegardes
- Supabase propose des sauvegardes automatiques
- Exportez régulièrement les données importantes
- Conservez une copie du schéma de la base de données

## 9. Coûts prévisionnels

### Gratuité
- Vercel : Hobby plan (gratuit)
- Supabase : Free tier (jusqu'à 500MB de données)
- GitHub : Public repository (gratuit)

### Limites gratuites
- Vercel : 100GB bande passante/mois
- Supabase : 500MB base de données, 50k connexions/mois
- Suffisant pour un colloque de taille moyenne

## 10. Support

En cas de problème :
1. Vérifiez les logs Vercel
2. Consultez la documentation Next.js
3. Vérifiez la configuration Supabase
4. Testez en local avant de déployer
