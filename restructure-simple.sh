#!/bin/bash

echo "🔧 RESTRUCTURATION AUTOMATIQUE DU REPO"
echo "======================================"
echo ""

# Vérifier qu'on est dans un repo Git
if [ ! -d ".git" ]; then
    echo "❌ Erreur: Ce n'est pas un repository Git"
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

# Créer la structure de dossiers
mkdir -p docs/assets
mkdir -p versions/{v7.0,v8.0,v9.0,v9.2,v10.4}
mkdir -p server

echo "✅ Dossiers créés"
echo ""
echo "📁 Déplacement des fichiers..."

# Déplacer les fichiers vers docs/
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

# Supprimer les fichiers temporaires
rm -f *.download.zip
rm -f "deploy.yml"
rm -rf "files" "files 2"
rm -f "files.zip"
echo "  ✅ Fichiers temporaires supprimés"

echo ""
echo "📦 Archivage version actuelle..."
VERSION=$(date +%Y%m%d_%H%M%S)
mkdir -p "versions/backup_$VERSION"
cp -r docs/* "versions/backup_$VERSION/" 2>/dev/null || true
echo "  ✅ Backup: versions/backup_$VERSION"

echo ""
echo "💾 Création du commit..."
git add .
git commit -m "🚀 Restructuration: GitHub Actions + versioning

- Structure docs/ pour GitHub Pages
- Workflow auto-deploy
- Archives versions/
- CHANGELOG.md + README.md
- .gitignore

Version: $VERSION"

echo ""
echo "✅ RESTRUCTURATION TERMINÉE !"
echo ""
echo "🎯 Prochaines étapes:"
echo "1. git push origin main"
echo "2. Activer GitHub Pages (Settings → Pages → gh-pages branch)"
echo ""
