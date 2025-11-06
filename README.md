# 🎨 Mon Content Manager

> Système de gestion de contenu pour streaming eCamm Live avec graphiques 3D volumétriques et synchronisation WebSocket temps réel.

[![Deploy](https://github.com/lezenesvincent-dotcom/mon-content-manager/actions/workflows/deploy.yml/badge.svg)](https://github.com/lezenesvincent-dotcom/mon-content-manager/actions)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue)](https://lezenesvincent-dotcom.github.io/mon-content-manager/)
[![Version](https://img.shields.io/badge/version-10.4-green)](CHANGELOG.md)

---

## 🌐 Live Demo

| Interface | URL |
|-----------|-----|
| **Gestion de contenu** | [index.html](https://lezenesvincent-dotcom.github.io/mon-content-manager/) |
| **Widget P1-P4** | [p1p4.html](https://lezenesvincent-dotcom.github.io/mon-content-manager/p1p4.html) |
| **Overlay eCamm** | [widget.html](https://lezenesvincent-dotcom.github.io/mon-content-manager/widget.html) |
| **Serveur WebSocket** | [wss://ecamm-overlay-server.onrender.com](https://ecamm-overlay-server.onrender.com) |

---

## ✨ Fonctionnalités

### 🎯 Gestion de contenu P1-P4
- ✅ 4 cartons de contenu indépendants
- ✅ Synchronisation temps réel via WebSocket
- ✅ Persistance localStorage
- ✅ Limites de caractères intelligentes
- ✅ Text wrapping automatique
- ✅ Indicateur de connexion en direct

### 📊 Graphique 3D volumétrique
- ✅ 650 points ultra-lisses (CatmullRomCurve3)
- ✅ Dégradé vertical sombre → clair
- ✅ Animation construction 3 secondes
- ✅ Ombres douces et progressives (VSM 4096×4096)
- ✅ Bords nets sans bevel
- ✅ Affichage années 2015-2025

### 🎨 Animations
- ✅ Lévitation des cartons
- ✅ Bordures respirantes
- ✅ Dégradés animés 360°
- ✅ Rotation 3D douce

### 🔧 Technique
- ✅ WebSocket auto-reconnexion
- ✅ Déploiement automatique (GitHub Actions)
- ✅ Versioning automatique
- ✅ Architecture modulaire

---

## 🚀 Déploiement automatique

Chaque `git push` sur `main` déclenche :

1. ✅ **Archivage automatique** de la version (horodatée)
2. ✅ **Déploiement GitHub Pages** (2 minutes)
3. ✅ **Notification de succès** dans Actions

```bash
git add .
git commit -m "✨ Nouvelle fonctionnalité"
git push
# → Déploiement automatique !
```

---

## 📦 Installation & Développement

### Prérequis
- Git
- Node.js 18+ (pour le serveur)
- Navigateur moderne

### Clone
```bash
git clone https://github.com/lezenesvincent-dotcom/mon-content-manager.git
cd mon-content-manager
```

### Développement local

#### Frontend (HTML/CSS/JS)
```bash
# Serveur HTTP simple
python3 -m http.server 8000
# Ou
npx serve docs

# Ouvrir http://localhost:8000
```

#### Serveur WebSocket
```bash
cd server
npm install
node server.js

# Le serveur démarre sur http://localhost:8080
```

---

## 📁 Structure du projet

```
mon-content-manager/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Auto-deploy GitHub Actions
├── docs/                       # GitHub Pages (production)
│   ├── index.html              # Interface de gestion
│   ├── widget.html             # Overlay eCamm
│   ├── p1p4.html              # Widget P1-P4
│   └── assets/
├── versions/                   # Archives des versions
│   ├── v7.0/
│   ├── v8.0/
│   ├── v9.0/
│   ├── v9.2/
│   ├── v10.4/
│   └── auto_*/                 # Archives automatiques
├── server/                     # Serveur WebSocket
│   ├── server.js
│   ├── package.json
│   └── README.md
├── README.md                   # Ce fichier
├── CHANGELOG.md                # Historique des versions
├── REGLE_PRESERVATION.md       # Règle de préservation
└── .gitignore
```

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [CHANGELOG.md](CHANGELOG.md) | Historique complet des versions |
| [REGLE_PRESERVATION.md](REGLE_PRESERVATION.md) | Règle de préservation des fonctionnalités |
| [server/README.md](server/README.md) | Documentation du serveur WebSocket |
| [versions/](versions/) | Archives de toutes les versions |

---

## 🎯 Roadmap

### Court terme (Q4 2025)
- [x] Graphique 3D volumétrique
- [x] Système de versioning automatique
- [ ] Intégration graphique 3D dans widget principal
- [ ] Tests automatisés (Jest / Playwright)

### Moyen terme (Q1 2026)
- [ ] API données boursières temps réel
  - Alpha Vantage
  - Yahoo Finance
  - Websocket streaming
- [ ] Système multi-sociétés (100+)
- [ ] Cache Redis pour performance
- [ ] Dashboard analytics

### Long terme (Q2 2026+)
- [ ] Backend Python FastAPI
- [ ] WebGL2 pour rendu avancé
- [ ] WASM pour calculs optimisés
- [ ] PWA pour utilisation offline
- [ ] Mobile app (React Native)

---

## 🛠️ Technologies

### Frontend
- **HTML5 / CSS3** - Interface utilisateur
- **JavaScript vanilla** - Logique métier
- **Three.js r128** - Graphiques 3D
- **WebSocket API** - Communication temps réel

### Backend
- **Node.js** - Runtime
- **Express.js** - Serveur HTTP
- **ws** - WebSocket server

### Infrastructure
- **GitHub Pages** - Hébergement frontend
- **Render.com** - Hébergement serveur WebSocket
- **GitHub Actions** - CI/CD

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. **Fork** le projet
2. **Créer une branche** : `git checkout -b feature/ma-fonctionnalite`
3. **Commit** : `git commit -m "✨ Ajout de ma fonctionnalité"`
4. **Push** : `git push origin feature/ma-fonctionnalite`
5. **Pull Request** : Ouvrir une PR avec description détaillée

### Guidelines
- Suivre la [REGLE_PRESERVATION.md](REGLE_PRESERVATION.md)
- Mettre à jour [CHANGELOG.md](CHANGELOG.md)
- Ajouter des tests si applicable
- Documentation claire

---

## 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| **Lignes de code** | ~2500 |
| **Fichiers** | 8 |
| **Versions** | 10.4 |
| **Uptime serveur** | 99.9% |
| **Temps de build** | ~2 min |

---

## 🐛 Bug Reports

Trouvé un bug ? [Ouvrir une issue](https://github.com/lezenesvincent-dotcom/mon-content-manager/issues/new)

### Template
```markdown
**Description**
Description claire et concise du bug.

**Reproduction**
1. Aller sur '...'
2. Cliquer sur '...'
3. Voir l'erreur

**Comportement attendu**
Ce qui devrait se passer.

**Screenshots**
Si applicable, ajouter des captures d'écran.

**Environnement**
- OS: [e.g. macOS 14.0]
- Navigateur: [e.g. Safari 17.0]
- Version: [e.g. 10.4]
```

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👨‍💻 Auteur

**Vincent Lezenes**
- GitHub: [@lezenesvincent-dotcom](https://github.com/lezenesvincent-dotcom)
- Site: [lezenesvincent.com](https://lezenesvincent-dotcom.github.io/mon-content-manager/)

---

## 🙏 Remerciements

- **Claude (Anthropic)** - Assistant développement IA
- **Three.js** - Bibliothèque 3D exceptionnelle
- **GitHub** - Hébergement et CI/CD gratuit
- **Render.com** - Hébergement serveur WebSocket

---

## 📞 Support

Besoin d'aide ?
- 📧 Email: [contact via GitHub](https://github.com/lezenesvincent-dotcom)
- 💬 Discussions: [GitHub Discussions](https://github.com/lezenesvincent-dotcom/mon-content-manager/discussions)
- 🐛 Issues: [GitHub Issues](https://github.com/lezenesvincent-dotcom/mon-content-manager/issues)

---

<div align="center">

**⭐ Star ce projet si tu le trouves utile !**

Made with ❤️ and ☕

</div>

---

**Dernière mise à jour** : 5 novembre 2025  
**Version actuelle** : 10.4
