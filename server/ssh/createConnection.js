var SSH = require('simple-ssh');



function create(ip, user, pass, port) {
    return new Promise(function (resolve, reject) {
        if (process.env.NODE_ENV == 'test') {
            resolve();
        }
        var ssh = new SSH({
            host: ip,
            user: user,
            pass: pass,
            port: port
        });
        var r = ssh.exec('ls', {
            out: function (stdout) {
                //pass ok 
                // console.log(stdout);
                resolve();
            },
            err: function (stderr) {
                reject(stderr); // this-does-not-exist: command not found 
            },
            timeout: function (err) {
                reject(stderr);
            }
        }).start();
    });
}

module.exports = create;