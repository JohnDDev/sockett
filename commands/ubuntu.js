const { promisify } = require('util');
const { exec } = require('child_process');

const promiseExec = promisify(exec);

const sdCasinoEnd = async (memberIdx) => {
    const path = process.env.UBUNTU_FOLDER_PATH;

    if (!path) {
        throw new Error('Command folder undefined.');
    }
    
    const folder = await promiseExec('cd ' + path);
    const php = await promiseExec('php index.php path/to/controller');
};

module.exports = {
    sdCasinoEnd
}