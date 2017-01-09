
// let mongoose = require("mongoose");
// let Command = require('../server/db/schemas').Command;

// //Require the dev-dependencies
// let chai = require('chai');
// let chaiHttp = require('chai-http');
// let server = require('../index');
// let should = chai.should();

// chai.use(chaiHttp);
// //Our parent block
// describe('Commands', () => {
//     beforeEach((done) => { //Before each test we empty the database
//         Command.remove({}, (err) => { 
//            done();         
//         });     
//     });
// /*
//   * Test the /GET route
//   */
//   describe('/GET Command', () => {
//       it('it should GET all the Commands', (done) => {
//         chai.request(server)
//             .get('/api/commands/').then(
//                 (rec)=>{ rec.have.status(200)}
//             )
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//                 res.body.length.should.be.eql(0);
//               done();
//             });
//       });
//   });

// });