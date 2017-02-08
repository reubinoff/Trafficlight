var client = require('./createSshClient')
var SSH = require('simple-ssh');


function run(core, command) {
    var ssh_client = client(core)

    ssh.on('error', function (err) {
        reject(err)
    });
    ssh.on('ready', function () {
        resolve()
    });

}

module.exports = run;