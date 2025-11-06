#!/bin/bash

# ============================================
# Script de restructuration automatique
# Transforme le repo actuel en structure GitHub Actions
# ============================================

echo "🔧 RESTRUCTURATION AUTOMATIQUE DU REPO"
echo "======================================"
echo ""

# Vérifier qu'on est dans un repo Git
if [ ! -d ".git" ]; then
    echo "❌ Erreur: Ce n'est pas un repository Git"
    echo "📝 Exécutez d'abord: git init"
    exit 1
fi

echo "✅ Repository Git détecté"
echo ""

# Demander confirmation
read -p "⚠️  Cette opération va restructurer le repo. Continuer? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Annulé"
    exit 1
fi

echo ""
echo "📦 Création de la structure..."
echo ""

# Créer la structure de dossiers
mkdir -p .github/workflows
mkdir -p docs/assets
mkdir -p versions/{v7.0,v8.0,v9.0,v9.2,v10.4}
mkdir -p server

echo "✅ Dossiers créés"
echo ""

# Déplacer les fichiers existants vers docs/
echo "📁 Déplacement des fichiers..."

if [ -f "content-manager-websocket.html" ]; then
    mv content-manager-websocket.html docs/index.html
    echo "  ✅ content-manager-websocket.html → docs/index.html"
fi

if [ -f "ecamm-widget-websocket-p1p4.html" ]; then
    mv ecamm-widget-websocket-p1p4.html docs/widget.html
    echo "  ✅ ecamm-widget-websocket-p1p4.html → docs/widget.html"
fi

if [ -f "content-management-p1-p4.html" ]; then
    mv content-management-p1-p4.html docs/p1p4.html
    echo "  ✅ content-management-p1-p4.html → docs/p1p4.html"
fi

# Déplacer le serveur
if [ -f "server.js" ]; then
    mv server.js server/
    echo "  ✅ server.js → server/"
fi

if [ -f "package.json" ]; then
    mv package.json server/
    echo "  ✅ package.json → server/"
fi

echo ""
echo "✅ Fichiers déplacés"
echo ""

# Copier les fichiers de configuration depuis outputs/
echo "📋 Copie des fichiers de configuration..."

# Workflow GitHub Actions
if [ -f "../outputs/.github/workflows/deploy.yml" ]; then
    cp ../outputs/.github/workflows/deploy.yml .github/workflows/
    echo "  ✅ .github/workflows/deploy.yml copié"
else
    echo "  ⚠️  deploy.yml non trouvé dans outputs/"
fi

# .gitignore
if [ -f "../outputs/.gitignore" ]; then
    cp ../outputs/.gitignore .
    echo "  ✅ .gitignore copié"
else
    echo "  ⚠️  .gitignore non trouvé dans outputs/"
fi

# CHANGELOG.md
if [ -f "../outputs/CHANGELOG.md" ]; then
    cp ../outputs/CHANGELOG.md .
    echo "  ✅ CHANGELOG.md copié"
else
    echo "  ⚠️  CHANGELOG.md non trouvé dans outputs/"
fi

# REGLE_PRESERVATION.md
if [ -f "../outputs/REGLE_PRESERVATION.md" ]; then
    cp ../outputs/REGLE_PRESERVATION.md .
    echo "  ✅ REGLE_PRESERVATION.md copié"
else
    echo "  ⚠️  REGLE_PRESERVATION.md non trouvé dans outputs/"
fi

# README principal
if [ -f "../outputs/README.md" ]; then
    cp ../outputs/README.md .
    echo "  ✅ README.md copié"
else
    echo "  ⚠️  README.md non trouvé dans outputs/"
fi

echo ""
echo "✅ Configuration copiée"
echo ""

# Archiver la version actuelle
echo "📦 Archivage de la version actuelle..."
VERSION=$(date +%Y%m%d_%H%M%S)
mkdir -p "versions/backup_$VERSION"
cp -r docs/* "versions/backup_$VERSION/" 2>/dev/null || true
echo "  ✅ Backup créé: versions/backup_$VERSION"
echo ""

# Créer un commit
echo "💾 Création du commit..."
git add .
git commit -m "🚀 Restructuration: GitHub Actions + versioning automatique

- Structure docs/ pour GitHub Pages
- Workflow auto-deploy
- Archives versions/
- CHANGELOG.md
- REGLE_PRESERVATION.md
- .gitignore

Version: $VERSION"

echo ""
echo "✅ Commit créé"
echo ""

# Afficher la nouvelle structure
echo "📁 Nouvelle structure:"
tree -L 2 -I 'node_modules' || ls -R

echo ""
echo "================================================"
echo "✅ RESTRUCTURATION TERMINÉE !"
echo "================================================"
echo ""
echo "🎯 Prochaines étapes:"
echo ""
echo "1. Vérifier la structure:"
echo "   ls -la"
echo ""
echo "2. Pousser vers GitHub:"
echo "   git push origin main"
echo ""
echo "3. Activer GitHub Pages:"
echo "   Settings → Pages → Source: gh-pages branch"
echo ""
echo "4. Vérifier le déploiement:"
echo "   Actions → voir le workflow"
echo ""
echo "🌐 Site live (après push):"
echo "   https://lezenesvincent-dotcom.github.io/mon-content-manager/"
echo ""
