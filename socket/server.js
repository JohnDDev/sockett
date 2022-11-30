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

            const usercode = socket.handshake?.query?.usercode;

            if (!usercode) {
                console.log('No usercode found.');
                return false;
            }

            const userSockets = await getUserSockets(io, usercode);

            if (userSockets.length > 0) {
                console.log('There is still existing socket connected to usercode:', usercode);
                return false;
            }
            
            console.log('run socket', userSockets.length, userSockets);
            await sdCasinoEnd(usercode);
            return;
        });
    });

    io.engine.on('connection_error', (err) => {
        console.log('Connection Error', err);
    });
};

const getUserSockets = async (io, usercode) => {
    const allSockets = await io.fetchSockets();
    const userSockets = allSockets.filter((item) => {
        return item.handshake?.query?.usercode === usercode;
    });

    return userSockets;
}

module.exports = { listen };