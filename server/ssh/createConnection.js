var SSH = require('simple-ssh');



function create(ip, user, pass, port) {
    return new Promise(function (resolve, reject) {
        var ssh = new SSH({
            host: ip,
            user: user,
            pass: pass,
            port: port
        });
        var r = ssh.exec('ls', {
            out: function (stdout) {
                //pass ok 
                console.log(stdout);
                resolve();
            },
            err: function (stderr) {
                reject(stderr); // this-does-not-exist: command not found 
            }
        }).start();
    });
}

module.exports = create;