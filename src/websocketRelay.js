const WebSocket = require('ws');
const express = require('express');
const { spawn } = require('child_process');

// ====== WEBSOCKET ======
const wsClient = new WebSocket('ws://localhost:8080');

// ====== EXPRESS ======
const app = express();
const PORT = 3030;

app.get('/stream', (req, res) => {
    // Configurer les en-têtes pour le streaming
    res.setHeader('Content-Type', 'video/mpeg');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    console.log("Get /stream")
    
    // Lorsqu'on reçoit des données de FFmpeg, les envoyer comme partie de la réponse HTTP
    wsClient.on('message', chunk => {
        console.log(chunk)
        res.write(chunk);
    });

    res.on('error', (err) => {
        console.error('Response Error:', err);
    });

    // Si le client termine la connexion, arrêtez FFmpeg
    req.on('close', () => {
        console.log("Client closed connexion")
    });
});

app.listen(PORT, () => {
    console.log(`Stream started on http://192.168.0.176:3000/stream`);
});

