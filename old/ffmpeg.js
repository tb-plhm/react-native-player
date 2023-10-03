const { spawn } = require('child_process');

const ffmpeg = spawn('ffmpeg', [
    "-rtsp_transport",
    "tcp",
    '-i', 'rtsp://admintapo:123456@192.168.0.152:554/stream1',
    '-r', '25',
    '-c:v', 'libx264',    // Utilisez le codec vidéo H.264
    '-preset', 'veryfast', // Optionnel : utilisez un préréglage pour ajuster la vitesse/qualité de l'encodage
    '-b:v', '2M',         // Optionnel : débit binaire vidéo, ajustez selon vos besoins
    '-c:a', 'aac',        // Utilisez le codec audio AAC
    '-strict', 'experimental',  // Nécessaire pour certains builds FFMPEG pour le codec AAC
    '-f', 'mp4',          // Format de sortie en MP4
    '-y', 'output.mp4'    // Nom du fichier de sortie. '-y' permet d'écraser le fichier s'il existe déjà
]);

/*
RTSP TO MP4
ffmpeg -rtsp_transport tcp -i rtsp://admintapo:123456@192.168.0.152:554/stream1 -c:v libx264 -preset medium -c:a aac -strict experimental -b:a 128k assets/output.mp4

RTSP TO HLS
ffmpeg -rtsp_transport tcp -i rtsp://admintapo:123456@192.168.0.152:554/stream1 -c:v libx264 -crf 21 -preset veryfast -c:a aac -strict experimental -f hls -hls_time 9 -hls_playlist_type vod assets/hls/output.m3u8

RTSP TO H264
ffmpeg -i rtsp://USERNAME:PASSWORD@YOUR_RTSP_IP_ADDRESS/PATH -c:v copy -an -f h264 output.h264

*/


// const ffmpeg = spawn('ffmpeg', [
    //     '-i', 'rtsp://admintapo:123456@192.168.0.152:554/stream1',
    //     //'-vf', 'scale=320:240',     // Réduisez la résolution à 640x360
    //     '-r', '15',                 // Réduisez la fréquence d'images à 15fps
    //     '-bf', '0',
    //     '-preset', 'ultrafast',     // Utilisez un réglage ultra rapide
    //     '-tune', 'zerolatency',    // Ajustez pour une latence nulle
    //     '-c:v', 'libx264',          // Utilisez le codec x264
    //     '-an',                      // Pas d'audio
    //     '-f', 'mpegts',             // Format de sortie
    //     '-'
    // ]);