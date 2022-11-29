const { promisify } = require('util');
const { exec } = require('child_process');

const promiseExec = promisify(exec);

const sdCasinoEnd = async (usercode) => {
    const phpPath = process.env.UBUNTU_PHP_PATH;
    const path = process.env.UBUNTU_COMMAND_PATH;
    const phpCommand = process.env.COMMAND_TEXT;

    if (!path || !phpPath || !phpCommand) {
        throw new Error('Command folder undefined.');
    }
    
    const phpCommandResult = await promiseExec(`${phpPath} ${path} ${phpCommand} ${usercode}`);
    console.log(phpCommandResult);
};

module.exports = {
    sdCasinoEnd
}
