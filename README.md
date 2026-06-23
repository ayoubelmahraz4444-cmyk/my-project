# Ayoub El Mahraz — Portfolio

Site portfolio personnel. Automatisation, IA, et pipelines de données — n8n, Gemini, Supabase.

## Aperçu

- Hero animé : graphe de nœuds inspiré des workflows n8n, avec des impulsions qui voyagent entre les nœuds en continu
- Bandeau "dernière exécution" simulant un vrai log de pipeline
- Sections compétences, projets et contact

## Stack

- HTML / CSS / JavaScript natif (aucune dépendance, aucun build)
- Canvas 2D pour l'animation du hero
- Police : JetBrains Mono (titres) + Inter (corps de texte)

## Lancer en local

Aucune installation nécessaire. Deux options :

```bash
# Option 1 — ouvrir directement
open index.html

# Option 2 — via un serveur local (recommandé pour éviter les soucis CORS)
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Déploiement

Compatible avec GitHub Pages, Netlify, ou Vercel — c'est un site statique, aucune configuration serveur requise.

### GitHub Pages

1. Aller dans **Settings → Pages**
2. Source : **Deploy from a branch**
3. Branch : **main**, dossier **/ (root)**
4. Le site sera disponible à `https://<ton-username>.github.io/<nom-du-repo>/`

## Structure

```
.
├── index.html   — structure et contenu
├── style.css    — design tokens et styles
├── script.js    — animation du pipeline + révélation des compétences au scroll
└── README.md
```

## Contact

ayoubelmahraz4444@gmail.com
