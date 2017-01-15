var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


let mongoose = require("mongoose");
var Command = mongoose.model('Command');

describe('Command', () => {
    beforeEach((done) => { //Before each test we empty the database
        Command.remove({}, (err) => {
            done();
        });
    });

    /*
    * Test the /PUT route
    */
    describe('/PUT Command', () => {
        it('it should not PUT a Command without command field', (done) => {
            let cmd = {
                "isSudoRequired": true,
                "timeoutInMilli": 1000,
                "description": "xczxczc"
            }
            chai.request(server)
                .put('/api/commands')
                .send(cmd)
                .end((err, res) => {
                    res.should.have.status(411);
                    res.body.should.be.a('object');
                    res.body.should.have.property('description').eql('Invalid Data');
                    done();
                });
        });

        it('it should PUT a Command ', (done) => {
            let cmd = {
                "command": "moshe",
                "isSudoRequired": true,
                "description": "xczxczc",
            }
            chai.request(server)
                .put('/api/commands')
                .send(cmd)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('command');
                    res.body.should.have.property('timeoutInMilli');
                    res.body.should.have.property('_id');
                    done();
                });
        });
    });
    /*
    * Test the /GET route
    */
    describe('/GET/:id Command', () => {
        it('it should GET all the Commands', (done) => {
            chai.request(server)
                .get('/api/commands')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
        it('it should GET a Command by the given id', (done) => {
            let cmd = new Command({
                "command": "moshe",
                "isSudoRequired": true,
                "description": "xczxczc",
            });
            cmd.save((err, cmd) => {
                chai.request(server)
                    .get('/api/commands/' + cmd.id)
                    .send(cmd)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(cmd.id);
                        done();
                    });
            });

        });
    });
    /*
   * Test the /POST route
   */
    describe('/POST/:id Command', () => {
        it('it should POST a Command by the given id and update existing record', (done) => {
            let cmd1 = new Command({
                "command": "moshe",
                "isSudoRequired": true,
                "description": "xczxczc",
            });
            let cmd2 = {
                "command": "moshe2",
                "isSudoRequired": true,
                "description": "xczxczc",
            };
            cmd1.save((err, cmd) => {
                chai.request(server)
                    .post('/api/commands/' + cmd.id)
                    .send(cmd2)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('command');
                        res.body.command.should.have.property('ok').eql(1);
                        res.body.command.should.have.property('n').eql(1);
                        done();
                    });
            });

        });
    });
    /*
    * Test the /DELETE route
    */
    describe('/DELETE/:id Command', () => {
        it('it should DELETE a Command given the id', (done) => {
            let cmd = new Command({
                "command": "moshe",
                "isSudoRequired": true,
                "description": "xczxczc",
                "timeoutInMilli": 777
            });
            cmd.save((err, book) => {
                chai.request(server)
                    .delete('/api/commands/' + cmd.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('command');
                        res.body.command.should.have.property('ok').eql(1);
                        res.body.command.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });


});