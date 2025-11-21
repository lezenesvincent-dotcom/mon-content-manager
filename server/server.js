const WebSocket = require('ws');

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

// État global
let state = {
    graphSettings: null
};

// Liste de tous les clients connectés
let clients = new Set();

wss.on('connection', (ws) => {
    console.log('✅ Nouveau client connecté');
    clients.add(ws);
    console.log(`👥 Clients connectés: ${clients.size}`);

    // Envoyer les paramètres actuels au nouveau client
    if (state.graphSettings) {
        ws.send(JSON.stringify({
            type: 'init',
            graphSettings: state.graphSettings
        }));
        console.log('📤 Paramètres initiaux envoyés au nouveau client');
    }

    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data.toString());
            console.log('📨 Message reçu:', message.type);

            // Gérer les messages de paramètres graphiques
            if (message.type === 'graph_settings') {
                // Sauvegarder les paramètres
                state.graphSettings = message.settings;
                console.log('💾 Paramètres graph sauvegardés');

                // BROADCAST à TOUS les autres clients
                clients.forEach(client => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify({
                            type: 'graph_settings',
                            settings: message.settings
                        }));
                        console.log('📤 Paramètres relayés à un autre client');
                    }
                });
            }
        } catch (error) {
            console.error('❌ Erreur parsing message:', error);
        }
    });

    ws.on('close', () => {
        clients.delete(ws);
        console.log(`👋 Client déconnecté. Restants: ${clients.size}`);
    });

    ws.on('error', (error) => {
        console.error('❌ Erreur WebSocket:', error);
        clients.delete(ws);
    });
});

console.log(`🚀 Serveur WebSocket démarré sur le port ${PORT}`);
console.log('📡 En attente de connexions...');
