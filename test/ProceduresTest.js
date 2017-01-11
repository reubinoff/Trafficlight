var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);


let mongoose = require("mongoose");
var Procedure = mongoose.model('Procedure');
var Command = mongoose.model('Command');


describe('Procedure', () => {
    beforeEach((done) => { //Before each test we empty the database
        Procedure.remove({}, (err) => {
            done();
        });
    });

    /*
    * Test the /PUT route
    */
    describe('/PUT Procedure', () => {
        it('it should PUT a Procedure ', (done) => {
            let cmd = new Command({
                "command": "moshe"
            });

            cmd.save((err, cmd) => {
                var serv = chai.request(server);
                let proc = {
                    "commands": [
                        {
                            "command": cmd.id,
                            "order": 3
                        }
                    ]
                    ,
                    "description": "procedure D"
                }
                serv.put('/api/Procedures')
                    .send(proc)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('description').eql("procedure D");
                        res.body.should.have.property('commands').that.is.an('array')
                        res.body.commands.length.should.be.eql(1)
                        res.body.commands.should.have.deep.property('[0].command', cmd.id)

                        done();
                    });
            });
        });
    });
    /*
   * Test the /GET route
   */
    describe('/GET/:id Procedure', () => {
        it('it should GET all the Procedures', (done) => {
            chai.request(server)
                .get('/api/Procedures')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
        it('it should GET a Procedure by the given id', (done) => {
            let cmd = new Command({
                "command": "moshe"
            });

            cmd.save((err, cmd) => {
                var serv = chai.request(server);
                let proc = new Procedure({
                    "commands": [
                        {
                            "command": cmd.id,
                            "order": 3
                        }
                    ]
                    ,
                    "description": "procedure D"
                });
                proc.save((err, proc) => {
                    chai.request(server)
                        .get('/api/Procedures/' + proc.id)
                        .send(proc)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('_id').eql(proc.id);
                            done();
                        });
                });
            });
        });
    });

    /*
     * Test the /POST route
     */
    describe('/POST/:id Procedure', () => {
        it('it should POST a Procedure by the given id and update existing record', (done) => {
            let cmd = new Command({
                "command": "moshe"
            });
            cmd.save((err, cmd) => {
                var serv = chai.request(server);
                let proc = new Procedure({
                    "commands": [
                        {
                            "command": cmd.id,
                            "order": 3
                        }
                    ]
                    ,
                    "description": "procedure D"
                });
                let proc2 = {
                    "commands": [
                        {
                            "command": cmd.id,
                            "order": 3
                        }
                    ]
                    ,
                    "description": "procedure E"
                };
                proc.save((err, proc) => {
                    chai.request(server)
                        .post('/api/procedures/' + proc.id)
                        .send(proc2)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('procedure');
                            res.body.procedure.should.have.property('ok').eql(1);
                            res.body.procedure.should.have.property('n').eql(1);
                            done();
                        });
                });
            });
        });
    });
    /*
     * Test the /DELETE route
     */
    describe('/DELETE/:id Procedure', () => {
        it('it should DELETE a Procedure given the id', (done) => {
            let proc = new Procedure({
                "Procedure": "moshe",
                "isSudoRequired": true,
                "description": "xczxczc",
                "timeoutInMilli": 777
            });
            proc.save((err, book) => {
                chai.request(server)
                    .delete('/api/Procedures/' + proc.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('procedure');
                        res.body.procedure.should.have.property('ok').eql(1);
                        res.body.procedure.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });


});