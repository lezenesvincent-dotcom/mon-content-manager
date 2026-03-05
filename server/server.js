const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const { google } = require('googleapis');
const multer = require('multer');
const stream = require('stream');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Ã‰tat global pour le graphique
let graphSettings = {
    cameraOffset: { x: 0, y: 5, z: 32 },
    cameraAngle: { horizontal: 0, vertical: -20 },
    graphMeshOffset: { x: 0, y: 0, z: 0 },
    lightPosition: { x: 5, y: 10, z: 7 },
    lightIntensity: 0.6,
    labelsXOffset: { x: 0, y: 0 },
    labelsYOffset: { x: 0, y: 0 },
    barreRougeOffset: { x: 0, y: -7.5, z: 0 },
    barreRougeIntensity: 1.5,
    barreRougeSize: { width: 9, height: 0.325, depth: 8 },
    graphWidth: 100,
    fontSizeLabelsX: 100,
    fontSizeLabelsY: 128,
    labelsXSpacing: 1.0
};

// Liste des clients connectÃ©s
let clients = new Set();

// Historique des contenus P1-P4
let contentHistory = [];

// WebSocket
wss.on('connection', (ws) => {
    console.log('âœ… Nouveau client connectÃ©');
    clients.add(ws);
    console.log(`ðŸ‘¥ Clients connectÃ©s: ${clients.size}`);

    // Envoyer les paramÃ¨tres actuels au nouveau client
    ws.send(JSON.stringify({
        type: 'init',
        settings: graphSettings
    }));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('ðŸ“¨ Message reÃ§u:', data.type);

            if (data.type === 'update') {
                // Sauvegarder les nouveaux paramÃ¨tres
                graphSettings = { ...graphSettings, ...data.settings };
                console.log('ðŸ’¾ ParamÃ¨tres sauvegardÃ©s');

                // Broadcaster Ã  tous les autres clients
                clients.forEach(client => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'update',
                            settings: graphSettings
                        }));
                    }
                });
                console.log('ðŸ“¤ ParamÃ¨tres diffusÃ©s aux autres clients');
            }
        } catch (error) {
            console.error('âŒ Erreur parsing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('ðŸ”Œ Client dÃ©connectÃ©');
        clients.delete(ws);
        console.log(`ðŸ‘¥ Clients restants: ${clients.size}`);
    });

    ws.on('error', (error) => {
        console.error('âŒ Erreur WebSocket:', error);
        clients.delete(ws);
    });
});

// Route de test
app.get('/', (req, res) => {
    res.send(`
        <h1>ðŸš€ Serveur WebSocket Graph 3D</h1>
        <p>âœ… Serveur actif</p>
        <p>ðŸ‘¥ Clients connectÃ©s: ${clients.size}</p>
        <p>ðŸ“Š ParamÃ¨tres actuels: ${JSON.stringify(graphSettings, null, 2)}</p>
    `);
});

// API REST pour rÃ©cupÃ©rer les paramÃ¨tres
app.get('/api/settings', (req, res) => {
    res.json(graphSettings);
});

// RÃ©cupÃ©rer l'historique
app.get('/api/history', (req, res) => {
    console.log('ðŸ“¤ GET /api/history -', contentHistory.length, 'Ã©lÃ©ments');
    res.json(contentHistory);
});

// Ajouter un contenu
app.post('/api/update', (req, res) => {
    const data = req.body;
    console.log('ðŸ“¥ POST /api/update:', data.titre || 'Sans titre');
    
    const historyItem = {
        id: data.id || 'content-' + Date.now(),
        titre: data.titre || '',
        soustitre: data.soustitre || '',
        p1: data.p1 || { sujet: '', contenu: [] },
        p2: data.p2 || { sujet: '', contenu: [] },
        p3: data.p3 || { sujet: '', contenu: [] },
        p4: data.p4 || { sujet: '', contenu: [] },
        timestamp: new Date().toISOString()
    };
    
    contentHistory.unshift(historyItem);
    
    if (contentHistory.length > 100) {
        contentHistory = contentHistory.slice(0, 100);
    }
    
    res.json({ success: true, id: historyItem.id });
});

// Supprimer un contenu
app.delete('/api/history/:id', (req, res) => {
    const contentId = req.params.id;
    console.log('ðŸ—‘ï¸ DELETE:', contentId);
    
    const lengthBefore = contentHistory.length;
    contentHistory = contentHistory.filter(item => item.id !== contentId);
    
    if (contentHistory.length < lengthBefore) {
        console.log('âœ… SupprimÃ©, reste:', contentHistory.length);
        res.json({ success: true, remaining: contentHistory.length });
    } else {
        res.status(404).json({ success: false, message: 'Non trouvÃ©' });
    }
});

// ===== GOOGLE DRIVE UPLOAD =====
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 1024 * 1024 * 1024 } }); // 1GB max

const DRIVE_FOLDER_ID = process.env.DRIVE_FOLDER_ID || '1gROzff55slWESoPHFP0yk8XCJj8M3omZ';

function getDriveService() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
  const auth = new google.auth.GoogleAuth({
    credentials: credentials,
    scopes: ['https://www.googleapis.com/auth/drive.file']
  });
  return google.drive({ version: 'v3', auth });
}

// CrÃ©er un sous-dossier par fiche si nÃ©cessaire
async function getOrCreateSubfolder(drive, ficheId, ficheName) {
  // Chercher si le sous-dossier existe dÃ©jÃ 
  var folderName = ficheId + (ficheName ? ' - ' + ficheName : '');
  var query = "name='" + folderName.replace(/'/g, "\\'") + "' and '" + DRIVE_FOLDER_ID + "' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false";
  
  var res = await drive.files.list({ q: query, fields: 'files(id, name)' });
  if (res.data.files.length > 0) {
    return res.data.files[0].id;
  }
  
  // CrÃ©er le sous-dossier
  var folder = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [DRIVE_FOLDER_ID]
    },
    fields: 'id'
  });
  console.log('ðŸ“ Dossier crÃ©Ã©:', folderName, folder.data.id);
  return folder.data.id;
}

// Upload un fichier sur Google Drive
app.post('/api/upload-drive', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Aucun fichier reÃ§u' });
    }
    
    var ficheId = req.body.ficheId || 'unknown';
    var ficheName = req.body.ficheName || '';
    var slotLabel = req.body.slotLabel || 'fichier';
    
    console.log('â¬†ï¸ Upload:', req.file.originalname, '(' + (req.file.size / 1024 / 1024).toFixed(1) + ' MB)', 'â†’ fiche', ficheId);
    
    var drive = getDriveService();
    var folderId = await getOrCreateSubfolder(drive, ficheId, ficheName);
    
    // CrÃ©er un stream lisible depuis le buffer
    var bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);
    
    // Upload sur Drive
    var fileName = slotLabel + ' - ' + req.file.originalname;
    var driveRes = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId]
      },
      media: {
        mimeType: req.file.mimetype,
        body: bufferStream
      },
      fields: 'id, name, webViewLink, webContentLink, size'
    });
    
    // Rendre le fichier accessible via lien
    await drive.permissions.create({
      fileId: driveRes.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    });
    
    console.log('âœ… Upload Drive OK:', driveRes.data.name, driveRes.data.id);
    
    res.json({
      success: true,
      fileId: driveRes.data.id,
      fileName: driveRes.data.name,
      viewLink: driveRes.data.webViewLink,
      downloadLink: driveRes.data.webContentLink,
      size: driveRes.data.size
    });
    
  } catch (err) {
    console.error('âŒ Upload Drive erreur:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Lister les fichiers d'une fiche
app.get('/api/drive-files/:ficheId', async (req, res) => {
  try {
    var drive = getDriveService();
    var ficheId = req.params.ficheId;
    
    // Chercher le sous-dossier de cette fiche
    var query = "name contains '" + ficheId.replace(/'/g, "\\'") + "' and '" + DRIVE_FOLDER_ID + "' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false";
    var folders = await drive.files.list({ q: query, fields: 'files(id, name)' });
    
    if (folders.data.files.length === 0) {
      return res.json({ files: [] });
    }
    
    var folderId = folders.data.files[0].id;
    var files = await drive.files.list({
      q: "'" + folderId + "' in parents and trashed=false",
      fields: 'files(id, name, mimeType, size, webViewLink, webContentLink, thumbnailLink, createdTime)',
      orderBy: 'createdTime desc'
    });
    
    res.json({ files: files.data.files || [] });
    
  } catch (err) {
    console.error('âŒ Drive list erreur:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Supprimer un fichier Drive
app.delete('/api/drive-file/:fileId', async (req, res) => {
  try {
    var drive = getDriveService();
    await drive.files.delete({ fileId: req.params.fileId });
    console.log('ðŸ—‘ï¸ Fichier Drive supprimÃ©:', req.params.fileId);
    res.json({ success: true });
  } catch (err) {
    console.error('âŒ Drive delete erreur:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// DÃ©marrer le serveur
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log('');
    console.log('ðŸš€ ========================================');
    console.log('   Serveur WebSocket Graph 3D');
    console.log('ðŸš€ ========================================');
    console.log('');
    console.log(`   ðŸ“¡ HTTP: http://localhost:${PORT}`);
    console.log(`   ðŸ”Œ WebSocket: ws://localhost:${PORT}`);
    console.log('');
    console.log('   âœ… Serveur dÃ©marrÃ© avec succÃ¨s !');
    console.log('');
});
