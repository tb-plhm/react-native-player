// ====== FFMPEG ======
const ffmpeg = require('fluent-ffmpeg');

const command = ffmpeg()
.input('rtsp://admintapo:123456@192.168.0.152:554/stream1')
.addOptions([
    '-rtsp_transport tcp',
    '-loglevel panic',
    '-c:v copy',
    '-an',
    '-f mpegts'
])
.on('error', (error) => {
    console.log(error)
})
.on('end', () => {
    console.log('Processing finished !');
});

const ffstream = command.pipe();

ffstream.on('data', (chunk) => {
    console.log(chunk)
})