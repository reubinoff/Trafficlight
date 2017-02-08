var client = require('./createSshClient')
var SSH = require('simple-ssh');


export function run(core, command) {
    var ssh_client = client(core)

    ssh.on('error', function (err) {
        reject(err)
    });
    ssh.on('ready', function () {
        resolve()
    });

}