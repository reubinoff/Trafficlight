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
            port: port,
            timeout: 2000
        });
        ssh.on('error', function (err) {
            reject(err)
        });
         ssh.on('ready', function () {
            resolve()
        });
        var r = ssh.exec('uname', {
            // start: function (data) {
            //     console.log("start" + data)
            // },
            // out: function (stdout) {
            //     //pass ok 
            //     console.log(stdout);
            //     resolve();
            // },
            // err: function (stderr) {
            //     console.log(stderr)
            //     reject(stderr); // this-does-not-exist: command not found 
            // },
            // timeout: function (err) {
            //     console.log(stderr)
            //     reject(stderr);
            // },
            // exit: function (data) {
            //     console.log(data)
            // }
        }).start();
    });
}

module.exports = create;