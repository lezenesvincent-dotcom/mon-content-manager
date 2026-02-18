# 🚀 DÉPLOIEMENT SERVEUR WEBSOCKET - RENDER.COM

## 📦 Fichiers nécessaires
- `server.js` - Le serveur WebSocket corrigé
- `package.json` - Les dépendances

## 🔧 ÉTAPES DE DÉPLOIEMENT

### Option 1 : Mise à jour du service existant (RECOMMANDÉ)

1. **Va sur Render.com Dashboard**
   - https://dashboard.render.com/

2. **Trouve ton service existant**
   - Nom : `ecamm-overlay-server`
   - URL : `ecamm-overlay-server.onrender.com`

3. **Remplace les fichiers**
   - Va dans l'onglet "Shell" ou connecte-toi au repo GitHub
   - Remplace `server.js` et `package.json` par les nouveaux fichiers
   - Commit et push

4. **Redéploiement automatique**
   - Render détectera le changement
   - Le service redémarrera automatiquement

---

### Option 2 : Nouveau service depuis zéro

1. **Dashboard Render → New → Web Service**

2. **Choisir la source**
   - "Build and deploy from a Git repository"
   - OU "Deploy from GitHub"

3. **Configuration du service**
   ```
   Name: ecamm-overlay-server
   Region: Frankfurt (EU Central)
   Branch: main
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```

4. **Variables d'environnement** (optionnel)
   ```
   PORT = (laisser vide, Render gère automatiquement)
   ```

5. **Créer le service** → Attendre le déploiement

---

## ✅ VÉRIFICATION

Une fois déployé, tu devrais voir dans les logs Render :
```
🚀 Serveur WebSocket démarré sur le port 8080
📡 En attente de connexions...
```

Quand tu ouvres `graph-controls.html` :
```
✅ Nouveau client connecté
👥 Clients connectés: 1
```

Quand tu ouvres `graph-3d-VORANGE.html` :
```
✅ Nouveau client connecté
👥 Clients connectés: 2
📤 Paramètres initiaux envoyés au nouveau client
```

Quand tu cliques dans les contrôles :
```
📨 Message reçu: graph_settings
💾 Paramètres graph sauvegardés
📤 Paramètres relayés à un autre client
```

---

## 🔍 DEBUGGING

Si ça ne marche toujours pas :

1. **Vérifie les logs Render**
   - Dashboard → Service → Logs
   - Cherche les erreurs

2. **Console navigateur (F12)**
   - Dans `graph-controls.html` :
     ```
     📤 Envoi mise à jour: {...}
     ✅ Message envoyé via WebSocket
     ```
   
   - Dans `graph-3d-VORANGE.html` :
     ```
     📨 Message WebSocket reçu: graph_settings
     🔄 Synchronisation paramètres depuis autre client
     ✅ Toutes les mises à jour appliquées
     ```

3. **Test WebSocket direct**
   - Ouvre la console dans `graph-controls.html`
   - Tape : `ws.readyState`
   - Résultat : `1` = OPEN ✅

---

## 🆘 SI PROBLÈME PERSISTE

### Le graphique ne bouge pas ?
- Vérifie que les DEUX pages sont ouvertes en même temps
- Rafraîchis le graphique (Ctrl+R) après avoir changé un paramètre
- Regarde la console du graphique : tu dois voir "📨 Message WebSocket reçu"

### WebSocket se déconnecte ?
- Render Free tier : connexion peut dormir après 15 min
- Solution : ouvre les deux pages pour "réveiller" le serveur

### Erreur CORS ?
- Pas de problème CORS avec WebSocket
- Si erreur : vérifie l'URL `wss://ecamm-overlay-server.onrender.com`

---

## 📱 CONTACT

Si besoin d'aide, fournis :
- Capture des logs Render
- Console des deux pages (F12)
- L'URL de ton service Render
