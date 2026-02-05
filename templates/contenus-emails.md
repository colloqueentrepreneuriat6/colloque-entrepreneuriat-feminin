# Contenus des emails pour les membres du comité scientifique

## Email pour la Présidente (Pr. HIDER Fouzia)
**Destinataire :** Pr. HIDER Fouzia  
**Username :** hiderfouzia  
**Password :** admin2024  
**Rôle :** Administrateur  

**Objet :** Vos identifiants d'administrateur - Colloque National sur l'Entrepreneuriat Féminin

**Variables à remplacer dans le template :**
- {{MEMBRE_NOM}} → "Pr. HIDER Fouzia"
- {{USERNAME}} → "hiderfouzia"
- {{PASSWORD}} → "admin2024"
- {{PLATFORM_URL}} → "https://votre-domaine.com/connexion"

---

## Email pour les membres du comité (reviewers)

### Pr. AHOUARI Zahir
**Username :** ahouarizahir  
**Password :** comite2024

### Pr. BESSAI Rachid
**Username :** bessairachid  
**Password :** comite2024

### Pr. DJADDA Mahmoud
**Username :** djaddamahmoud  
**Password :** comite2024

### Pr. BENKKEROU Fiadh
**Username :** benkkeroufiadh  
**Password :** comite2024

### Dr. DJEFFAL Mokrane
**Username :** djeffalmokrane  
**Password :** comite2024

### Pr. FARADJ MOHAMED AKLI
**Username :** faradjakli  
**Password :** comite2024

### Dr. DJOUAB Mustapha
**Username :** djouabmustapha  
**Password :** comite2024

### Dr. HIDER FOUZIA (compte reviewer)
**Username :** hiderfouziamember  
**Password :** comite2024

### Dr. DJELOULI Nesrine
**Username :** djeloulinesrine  
**Password :** comite2024

### Dr. HALIS Samir
**Username :** halissamir  
**Password :** comite2024

### Dr. NOUI RABAH
**Username :** nouirabah  
**Password :** comite2024

### Dr. IDIR SMAIL
**Username :** idirsmail  
**Password :** comite2024

### Dr. HAMOUDI SOUHILA
**Username :** hamoudisouhila  
**Password :** comite2024

### Dr. AISSATMOHAND TAHAR
**Username :** aissatmohand  
**Password :** comite2024

### Dr. AIT HATRITE KAHINA
**Username :** aithatritekahina  
**Password :** comite2024

### Dr. OUSAIDENE Yassine
**Username :** ousaideneyassine  
**Password :** comite2024

### Pr. ABEDOU Abderrahmane
**Username :** abedouabderrahmane  
**Password :** comite2024

### Dr. MELLOUD Sidali
**Username :** melloudsidali  
**Password :** comite2024

### Pr. TOBAL Rachid
**Username :** tobalrachid  
**Password :** comite2024

### Pr. kafi Farida
**Username :** kafifarida  
**Password :** comite2024

### Dr.Boudjerda yacine
**Username :** boudjerdayacine  
**Password :** comite2024

---

## Contenus des emails pour les participants

### Bloc de décision - ACCEPTATION
```html
<div class="decision-accepted">
    <div class="decision-title accepted">🎉 FÉLICITATIONS - PROPOSITION ACCEPTÉE</div>
    <p>Nous avons le plaisir de vous informer que votre proposition a été <strong>acceptée</strong> par le comité scientifique.</p>
    <p>Vous serez contacté(e) prochainement pour les détails concernant votre participation au colloque.</p>
</div>
```

### Bloc de décision - REFUS
```html
<div class="decision-rejected">
    <div class="decision-title rejected">PROPOSITION NON RETENUE</div>
    <p>Nous regrettons de vous informer que votre proposition n'a pas été retenue cette fois-ci.</p>
    <p>Nous vous remercions de la qualité de votre travail et vous encourageons à continuer vos recherches sur l'entrepreneuriat féminin.</p>
</div>
```

---

## Instructions d'envoi

1. **Personnaliser chaque email** avec le nom du membre
2. **Remplacer** {{PLATFORM_URL}} par l'URL réelle de votre plateforme
3. **Utiliser** le template `email-membre-comite.html` pour tous les membres
4. **Utiliser** le template `email-participant.html` avec le bloc de décision approprié
5. **Tester** l'affichage sur différents clients email avant envoi massif

---

## Notes de sécurité

- Les mots de passe sont simples pour faciliter la première connexion
- Demander aux membres de changer leur mot de passe lors de la première connexion
- Ne pas envoyer les identifiants par email non chiffré si possible
- Prévoir une procédure de récupération de mot de passe
