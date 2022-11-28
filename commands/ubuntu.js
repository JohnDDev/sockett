const { promisify } = require('util');
const { exec } = require('child_process');

const promiseExec = promisify(exec);

const sdCasinoEnd = async (memberIdx) => {
    const path = process.env.UBUNTU_INDEX_PHP_PATH;
    const phpPath = process.env.UBUNTU_PHP_PATH;

    if (!path) {
        throw new Error('Command folder undefined.');
    }
    
    const phpCommandResult = await promiseExec(`${phpPath} ${path} cli endSdCasino 8892`);
    console.log(phpCommandResult);
};

module.exports = {
    sdCasinoEnd
}