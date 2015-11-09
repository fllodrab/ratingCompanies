
var dbURI    = 'mongodb://localhost/expressTest'
    , should   = require('chai').should()
    , mongoose = require('mongoose')
    , Dummy    = mongoose.model('Dummy', new mongoose.Schema({companyName:String, rate:Number}))
    , clearDB  = require('mocha-mongoose')(dbURI)
    ;

describe("Users -> Companies", function() {
    beforeEach(function(done) {
        if (mongoose.connection.db) return done();

        mongoose.connect(dbURI, done);
    });

    it("can be saved", function(done) {
        new Dummy({companyName: 'AVIVA'}).save(done);
    });

    it("can be listed", function(done) {
        new Dummy({companyName: 'AVIVA', rate: 7}).save(function(err, model){
            if (err) return done(err);

            new Dummy({companyName: 'Fernando Llodra', rate: 7}).save(function(err, model){
                if (err) return done(err);

                Dummy.find({}, function(err, docs){
                    if (err) return done(err);

                    // without clearing the DB between specs, this would be 3
                    docs.length.should.equal(2);
                    done();
                });
            });
        });
    });

    it("can clear the DB on demand", function(done) {
        new Dummy({companyName: 'MICROSOFT'}).save(function(err, model){
            if (err) return done(err);

            clearDB(function(err){
                if (err) return done(err);

                Dummy.find({}, function(err, docs){
                    if (err) return done(err);

                    console.log(docs);

                    docs.length.should.equal(0);
                    done();
                });
            });
        });
    });
});
