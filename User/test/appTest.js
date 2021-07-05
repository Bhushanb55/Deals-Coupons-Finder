const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect
const request = require("supertest");

chai.use(chaiHttp)
chai.should();
const server = require("../index");
var app = request.agent(server.app);
var userModel = require("../models/user-models");

describe("GET Request", function () {
    describe("Getting all the users from the users collection of the Deals and Coupons Users Database.",function(){
    it("A successful get request should return status code equal to 200 and all the users.", (done) => {
      chai.request(server.app).get("/userrights/users").end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.an('array');
          done();   
            });
        });
        it("Should not return any user.", (done) => {
            chai.request(server.app).get("/userrights/user").end((err, res)=> {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res).to.be.an('object');
                done();   
            });
        });
    });
});


describe("GET Request By _id", function () {
    describe("Getting a particular user from the users collection of the DealsandCouponsUsers Database.",function(){
    it("A successful get request should return status code equal to 200 and all the particular user.", (done) => {
        const id = "60ce36ae09266c0fbe91d210";
        chai.request(server.app).get("/userrights/user/"+id).end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();   
            });
        });
        it("Should not return any user.", (done) => {
            const id = "123";
            chai.request(server.app).get("/userrights/user/"+id).end((err, res)=> {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res).to.be.an('object');
                done();   
            });
        });
    });
});

describe("POST Request.", function(){
    describe("Adding a new user into the users collection of the Deals and Coupons Users Database.",function(){
        it("Successful insertion should return status code equal to 200.", async function(){
            let res = await chai
        	.request(server.app)
        	.post('/userrights/useradd').send({
                full_name: "Swaroop Lute Testing...",
                email_address: "swrp124@gmail.com",
                password: "swp123$%",
                mobile_number: 9876756765
    })

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
    res.body.data.should.have.property('_id');
    res.body.data.should.have.property('full_name').eq("Swaroop Lute Testing...");
    res.body.data.should.have.property('email_address').eq("swrp124@gmail.com");
    // res.body.data.should.have.property('password').eq("swp123$%");
    res.body.data.should.have.property('mobile_number').eq(9876756765);
     });
     afterEach(async () => {
    	await userModel.deleteOne({full_name: "Swaroop Lute Testing..."})
	    });
    });
});

describe("PUT Request.", function(){
    describe("Updating a user in the users collection of the DealsandCouponsUsers Database.",function(){
        it("Successful updation should return status code equal to 200 and the updated user.", async function(){
            const id = "60cf35c75c2d3754dcf7259c";
            let res = await chai
        	.request(server.app)
        	.put('/userrights/userupdate/' + id).send({
                full_name: "Swaroop Lute Update userms..",
                password: "swp123$%@@hh"
    })

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
    res.body.should.have.property('_id');
    res.body.should.have.property('full_name').eq("Swaroop Lute Update userms..");
    res.body.should.have.property('email_address').eq("abc@gmail.com");
    // res.body.should.have.property('password').eq("swp123$%@@hh");
    res.body.should.have.property('mobile_number').eq(6678123451);
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .put('/userrights/userupdate/' + id).send({
            full_name: "Swaroop Lute Update1...",
            password: "swp123$%2333"
});

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});




describe("DELETE Request.", function(){
    describe("Deleting a user in the users collection of the DealsandCouponsUsers Database.",function(){
        it("Successful deletion should delete a user and return status code equal to 200.", async function(){
            const id = "60d993290bf3a62e28afc099";
            let res = await chai
        	.request(server.app)
        	.delete('/userrights/userdelete/' + id)

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .delete('/userrights/userdelete/' + id)

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});