const chai = require("chai");
const chaiHttp = require("chai-http");
const request = require("supertest");
const expect = chai.expect
chai.should();
chai.use(chaiHttp)
const server = require("../index");
var app = request.agent(server.app);
var adminModel = require("../models/admin-models");
var userModel = require("../../User/models/user-models");


describe("GET Request", function () {
    describe("Getting all the admins from the admins collection of the DealsandCouponsAdmins Database.",function(){
    it("A successful get request should return status code equal to 200 and all the admins.", (done) => {
      chai.request(server.app).get("/adminrights/admins").end((err, res)=> {
          if (err) done(err);
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          res.body.should.be.an('array');
          done();   
            });
        });
        it("Should not return any admin.", (done) => {
            chai.request(server.app).get("/adminrights/admin").end((err, res)=> {
                if (err) done(err);
                expect(res).to.have.status(404);
                expect(res).to.be.an('object');
                done();   
            });
        });
    });
});

describe("POST Request.", function(){
    describe("Adding a new admin into the admins collection of the Deals and Coupons Admins Database.",function(){
        it("Successful insertion should return status code equal to 200.", async function(){
            let res = await chai
        	.request(server.app)
        	.post('/adminrights/adminadd').send({
                full_name: "Admin Testing...",
                email_address: "admin123@gmail.com",
                password: "admin1",
                mobile_number: 9876755555
    })

    expect(res.status).to.equal(201);
    res.body.should.be.a('object');
    res.body.data.should.have.property('_id');
    res.body.data.should.have.property('full_name').eq("Admin Testing...");
    res.body.data.should.have.property('email_address').eq("admin123@gmail.com");
    // res.body.data.should.have.property('password').eq("admin");
    res.body.data.should.have.property('mobile_number').eq(9876755555);
     });
     afterEach(async () => {
    	await adminModel.deleteOne({mobile_number: 9876755555}, function(err){
            if (err) return handleError(err);
        })
	    });
    });
});

describe("PUT Request.", function(){
    describe("Updating an admin in the admins collection of the DealsandCouponsAdmins Database.",function(){
        it("Successful updation should return status code equal to 200 and the updated admin.", async function(){
            const id = "60d205b464e31665b86d6063";
            let res = await chai
        	.request(server.app)
        	.put('/adminrights/adminupdate/' + id).send({
                full_name: "Talif Pathan Update1..",
                password: "tp786"
    })

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
    res.body.should.have.property('_id');
    res.body.should.have.property('full_name').eq("Talif Pathan Update1..");
    res.body.should.have.property('email_address').eq("talif@gmail.com");
    res.body.should.have.property('mobile_number').eq(7678089559);
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .put('/adminrights/adminupdate/' + id).send({
            full_name: "Swaroop Lute Update1...",
            password: "swp123$%2333"
});

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});




describe("DELETE Request.", function(){
    describe("Deleting an admin from the admins collection of the DealsandCouponsAdmins Database.",function(){
        it("Successful deletion should delete a user and return status code equal to 200.", async function(){
            const id = "60ca4440b297eb46f89b077b";
            let res = await chai
        	.request(server.app)
        	.delete('/adminrights/deleteadmin/' + id)

    expect(res.status).to.equal(200);
    expect(res).to.be.an('object');
    res.body.should.be.a('object');
     });
     it("If the id doesn't exists.", async function(){
        const id = "567";
        let res = await chai
        .request(server.app)
        .delete('/adminrights/admindelete/' + id)

    expect(res.status).to.equal(404);
    expect(res).to.be.an('object');
        });
    });
});