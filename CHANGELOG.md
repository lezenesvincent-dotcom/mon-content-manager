# 📝 Changelog - Mon Content Manager

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère à [Semantic Versioning](https://semver.org/lang/fr/).

---

## [10.4] - 2025-11-05

### ✨ Ajouté
- **Graphique 3D volumétrique ultra-lisse**
  - 650 points interpolés avec CatmullRomCurve3
  - Dégradé vertical (base #4a5694 → haut #a8b5f0)
  - Animation construction progressive 3 secondes
  - Ombres douces et progressives (VSM 4096×4096, opacity 0.15)
  - Bords nets sans bevel
  
- **Affichage temporel**
  - Années 2015-2025 au lieu de mois
  - Toutes les années affichées
  
- **Optimisations visuelles**
  - Labels collés aux lignes horizontales (X=-8)
  - Lignes 30% plus fines (0.084 au lieu de 0.12)
  - Camera dézoomée (Z=22 pour meilleure vue d'ensemble)
  - Plan de sol invisible pour recevoir ombres

### 🎨 Amélioré
- Qualité de rendu maximale (pixel ratio 4)
- Anti-aliasing ultra-performant
- Smooth shading avec computeVertexNormals

### 📝 Documentation
- README v10.3 complet avec tous les paramètres
- Historique de session détaillé
- Métriques de performance

---

## [10.0-10.3] - 2025-11-05

### Itérations multiples
- Tests résolution (516px → 1920×1080)
- Tests matériaux (Basic → Lambert → Physical)
- Tests éclairage (multiple → simplifié)
- Tests bevel (0.5 → 0.35 → 0.245 → désactivé)
- Tests courbes (13 → 390 → 650 points)

### Décisions techniques
- ❌ Abandon OBJ externe (non évolutif)
- ✅ Génération procédurale par code
- ✅ ExtrudeGeometry avec vertex colors
- ✅ VSMShadowMap pour ombres douces

---

## [9.2] - 2025-11-04

### ✨ Ajouté
- **Système WebSocket P1-P4 complet**
  - 4 cartons de contenu indépendants
  - Synchronisation temps réel
  - Auto-reconnexion robuste
  
- **Animations restaurées**
  - Lévitation des cartons (translateY)
  - Bordures respirantes (box-shadow)
  - Dégradés animés 360° (background-position)
  - Toutes les animations de v9.0 restaurées

### 🐛 Corrigé
- Perte animations lors fusion Three.js
- Synchronisation WebSocket instable
- Problèmes de persistence localStorage

### 📋 Documentation
- Création REGLE_PRESERVATION.md
- Règle : JAMAIS supprimer de fonctionnalités sans demande explicite

---

## [9.0] - 2025-11-03

### ✨ Ajouté
- **Interface de management P1-P4**
  - 4 colonnes pour 4 cartons
  - Limites de caractères intelligentes
  - Text wrapping automatique
  - Indicateur connexion temps réel
  
- **Architecture WebSocket**
  - Serveur Node.js sur Render.com
  - Client WebSocket natif
  - Messages broadcast à tous les clients
  
- **Persistance**
  - localStorage pour backup local
  - Restore automatique au chargement

### 🎨 Style
- Dark theme cohérent avec homepage
- Cartons arrondis avec ombres
- Animations de lévitation
- Dégradés respirants

---

## [8.0] - 2025-11-02

### ✨ Ajouté
- **Overlay eCamm Live de base**
  - Cartons de contenu dynamiques
  - Layout responsive
  - Thème violet/bleu

### 🔧 Technique
- HTML/CSS/JS pur (pas de framework)
- Compatible eCamm Live
- Déploiement GitHub Pages

---

## [7.0] - 2025-11-01

### ✨ Initial Release
- **Content Manager v1**
  - Interface simple de gestion
  - Overlay basique
  - Premier déploiement

---

## 🎯 Roadmap

### À venir
- [ ] Intégration graphique 3D dans widget principal
- [ ] Connexion API données boursières réelles (Alpha Vantage / Yahoo Finance)
- [ ] Système multi-sociétés (100+)
- [ ] Cache Redis pour performance
- [ ] Tests automatisés (Jest / Playwright)
- [ ] Documentation utilisateur complète
- [ ] Mode debug / preview

### En discussion
- [ ] Backend Python FastAPI pour données boursières
- [ ] WebGL2 pour rendu encore meilleur
- [ ] WASM pour calculs géométrie plus rapides
- [ ] PWA pour utilisation offline

---

## 📊 Statistiques

| Version | Fichiers | Lignes de code | Taille |
|---------|----------|----------------|---------|
| 10.4    | 8        | ~2500         | ~100KB  |
| 9.2     | 5        | ~1800         | ~80KB   |
| 9.0     | 4        | ~1200         | ~60KB   |
| 8.0     | 3        | ~800          | ~40KB   |
| 7.0     | 2        | ~400          | ~20KB   |

---

## 🤝 Contributeurs

- **Vincent Lezenes** - Créateur et mainteneur
- **Claude (Anthropic)** - Assistant développement

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.

---

**Dernière mise à jour** : 5 novembre 2025
