var SSH = require('simple-ssh');


 function getClient(core) {
    var ssh = new SSH({
        host: core.ip,
        user: core.user,
        pass: core.password,
        port: core.port,
        timeout: 2000
    });

}

module.exports = getClient;