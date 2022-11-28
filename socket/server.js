const { Server } = require('socket.io');

// const platform = process.platform;

// if (platform !== 'linux') {
//     throw new Error('OS unsupported.');
// }

const { sdCasinoEnd } = require('../commands/ubuntu');

const listen = (app) => {
    const io = new Server(app, {
        transports: ['websocket']
    });

    io.on('connection', (socket) => {
        console.log('Connected to socket:', socket.id);

        socket.on('disconnect', async () => {
            console.log('disconnected', socket.id);

            // await sdCasinoEnd(memberIdx);
            await sdCasinoEnd();
        });
    });

    io.engine.on('connection_error', (err) => {
        console.log('Connection Error', err);
    });
};

module.exports = { listen };