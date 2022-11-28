require('dotenv').config();

const { createServer } = require('http');

const server = createServer();
const io = require('./socket/server').listen(server);

const port = process.env.APP_PORT || 3000;

server.listen(port, () => {
    console.log(`Server is listening on localhost:${port}`);
});