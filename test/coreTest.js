var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);


let mongoose = require("mongoose");
var Core = mongoose.model('Core');

describe('Core', () => {
    beforeEach((done) => { //Before each test we empty the database
        Core.remove({}, (err) => {
            done();
        });
    });


    /*
    * Test the /PUT route
    */
    describe('/PUT Core', () => {
        it('it should not PUT a Core without ip field', (done) => {
            let conn = {
                "user": "mreubino",
                "password": "Napster1_0911",
                "port": 22
            }
            chai.request(server)
                .put('/api/Cores')
                .send(conn)
                .end((err, res) => {
                    res.should.have.status(550);
                    res.body.should.be.a('object');
                    res.body.should.have.property('description').eql('Invalid Data');
                    done();
                });
        });

        it('it should PUT a Core ', (done) => {
            let conn = {
                "ip": "192.18.1.4",
                "user": "mreubino",
                "password": "Napster1_0911",
                "port": 22
            }
            chai.request(server)
                .put('/api/Cores')
                .send(conn)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('ip');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('hasConnection').eql(false);
                    res.body.should.have.property('hasPing').eql(false);
                    done();
                });
        });
    });
    /*
* Test the /GET route
*/
    describe('/GET/:id Core', () => {
        it('it should GET all the Cores', (done) => {
            chai.request(server)
                .get('/api/Cores')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
        it('it should GET a Core by the given id', (done) => {
            let conn = new Core({
                "ip": "192.18.1.4",
                "user": "myUser",
                "password": "myPassword",
                "port": 22
            });
            conn.save((err, conn) => {
                chai.request(server)
                    .get('/api/Cores/' + conn.id)
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
    /*
   * Test the /POST route
   */
    describe('/POST/:id Command', () => {
        it('it should POST a Command by the given id and update existing record', (done) => {
                let conn1 = new Core({
                "ip": "192.18.1.4",
                "user": "myUser",
                "password": "myPassword",
                "port": 22
            });
             let conn2 = {
                "ip": "192.18.1.5",
                "user": "mreubino",
                "password": "Napster1_0911",
                "port": 22
            }
            conn1.save((err, conn) => {
                chai.request(server)
                    .post('/api/cores/' + conn.id)
                    .send(conn2)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('core');
                        res.body.core.should.have.property('ok').eql(1);
                        res.body.core.should.have.property('n').eql(1);
                        done();
                    });
            });

        });
    });
    /*
* Test the /DELETE route
*/
    describe('/DELETE/:id Core', () => {
        it('it should DELETE a Core given the id', (done) => {
            let conn = new Core({
                "ip": "192.18.1.4",
                "user": "mreubino",
                "password": "Napster1_0911",
                "port": 22
            });
            conn.save((err, book) => {
                chai.request(server)
                    .delete('/api/Cores/' + conn.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('Core');
                        res.body.Core.should.have.property('ok').eql(1);
                        res.body.Core.should.have.property('n').eql(1);
                        done();
                    });
            });
        });
    });


});