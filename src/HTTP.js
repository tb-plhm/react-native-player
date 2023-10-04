const WebSocket = require('ws');
const { WebSocketServer} = require("ws");
const express = require('express');
const { spawn } = require('child_process');

// ====== FFMPEG ======
const ffmpeg = spawn('ffmpeg', [
    '-i', 'rtsp://admintapo:123456@192.168.0.152:554/stream1',
    '-loglevel', 'panic',
    '-c:v', 'copy',   // Codec (Compresser / decompresser)              
    '-f', 'mpegts',   // Format de sortie
    '-'
]);

ffmpeg.on('error', (error) => {
    console.error("FFmpeg Error:", error);
});

ffmpeg.on('close', (code) => {
    console.log(`FFmpeg child process closed with code ${code}`);
});

let isFirstMessage = true;

ffmpeg.stdout.on("data", (data) => {
    // if (isFirstMessage) console.log("FFmpeg initialized")
    console.log(data)
    // isFirstMessage = false;
    // wsClient.send(data)
})

// ====== WEBSOCKET ======
// const wss = new WebSocketServer({ port: 8080 });
// wss.on('connection', function connection(ws) {
//     ws.on('error', console.error);
  
//     ws.on('message', function message(data, isBinary) {
//       wss.clients.forEach(function each(client) {
//         if (client.readyState === WebSocket.OPEN) {
//           client.send(data, { binary: isBinary });
//         }
//       });
//     });
//   });


// const wsClient = new WebSocket('ws://localhost:8080');

// // ====== EXPRESS ======
const app = express();
const PORT = 3000;

app.get('/stream', (req, res) => {
    // Configurer les en-têtes pour le streaming
    res.setHeader('Content-Type', 'video/mpeg');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    console.log("Get /stream")
    
    // Lorsqu'on reçoit des données de FFmpeg, les envoyer comme partie de la réponse HTTP
    ffmpeg.stdout.on('data', chunk => {
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

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Stream started on http://192.168.0.176:3000/stream`);
});

// Streamer sur http://192.168.0.176:3000/stream.ts
        