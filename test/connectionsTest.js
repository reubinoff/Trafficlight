var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);


let mongoose = require("mongoose");
var Connection = mongoose.model('Connection');

describe('Connection', () => {
    beforeEach((done) => { //Before each test we empty the database
        Connection.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET Connection', () => {
        it('it should GET all the connections', (done) => {
            chai.request(server)
                .get('/api/connections')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    /*
    * Test the /PUT route
    */
    describe('/PUT connection', () => {
        it('it should not PUT a connection without ip field', (done) => {
            let conn = {
                "user": "mreubino",
                "password": "Napster1_0911",
                "port": 22
            }
            chai.request(server)
                .put('/api/connections')
                .send(conn)
                .end((err, res) => {
                    res.should.have.status(550);
                    res.body.should.be.a('object');
                    res.body.should.have.property('description').eql('Invalid Data');
                    done();
                });
        });

        it('it should PUT a connection ', (done) => {
            let conn = {
                "ip": "192.18.1.4",
                "user": "mreubino",
                "password": "Napster1_0911",
                "port": 22
            }
            chai.request(server)
                .put('/api/connections')
                .send(conn)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('ip');
                    res.body.should.have.property('_id');
                    done();
                });
        });
    });
    describe('/GET/:id connection', () => {
        it('it should GET a connection by the given id', (done) => {
            let conn = new Connection({
                "ip": "192.18.1.4",
                "user": "mreubino",
                "password": "Napster1_0911",
                "port": 22
            });
            conn.save((err, conn) => {
                chai.request(server)
                    .get('/api/connections/' + conn.id)
                    .send(conn)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id').eql(conn.id);
                        done();
                    });
            });

        });
    });

    describe('/DELETE/:id connection', () => {
        it('it should DELETE a connection given the id', (done) => {
            let conn = new Connection({
                "ip": "192.18.1.4",
                "user": "mreubino",
                "password": "Napster1_0911",
                "port": 22
            });
            conn.save((err, book) => {
                chai.request(server)
                    .delete('/api/connections/' + conn.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('connection');
                        res.body.connection.should.have.property('ok').eql(1);
                        res.body.connection.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });


});