const { createServer } = require('http');

const server = createServer();
const io = require('./socket/server').listen(server);

const port = 3000;

server.listen(port, () => {
    console.log(`Server is listening on localhost:${port}`);
});