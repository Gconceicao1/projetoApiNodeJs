const supertest = require('supertest');
const app = require('../index');

describe("GET /", function(){
    it("status code 200 OK", function (done){
        supertest(app)
            .get("/")
            .expect(200)
            .end(function (error, response){
                if (error)done(error);
                done();
            });
    }
    );
});