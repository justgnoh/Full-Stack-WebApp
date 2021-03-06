import chai, { expect } from "chai";
import chaiHttp from "chai-http";
const app = require("../index.js");

chai.use(chaiHttp);
chai.should();

describe("Users", () => {
  describe("GET /getAllUsers", () => {
    it("should get users", (done) => {
      chai
        .request(app)
        .get("/getAllUsers")
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body[0]).to.have.all.keys("id", "name", "email");
          done();
        });
    });
  });

  describe("GET /getUser/:id", () => {
    it("should get user with user id 1", (done) => {
      chai
        .request(app)
        .get("/getUser/1")
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body[0]).to.have.all.keys("id", "name", "email");
          done();
        });
    });
  });

  describe("POST /users", () => {
    it("should post a user successfully", (done) => {
      chai
        .request(app)
        .post("/users")
        .send({ id: "4", name: "mocha", email: "chai@gmail.com" })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe("PUT /users/:id", () => {
    it("should update a user successfully", (done) => {
      chai
        .request(app)
        .put("/users/1")
        .send({ name: "pine", email: "pine@gmail.com" })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("DELETE /users/:id", () => {
    it("should delete a user successfully", (done) => {
      chai
        .request(app)
        .delete("/users/4")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("GET /users/:id", () => {
    it("should get EMPTY user after deletion", (done) => {
      chai
        .request(app)
        .get("/users/4")
        .end((err, res) => {
          res.should.have.status(404);
          expect(res.body).to.be.an('object').that.is.empty;
          done();
        });
    });
  });
});
