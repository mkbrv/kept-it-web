var assert = require('chai').assert;

module.exports = {

  runTests: function (name, validModel) {

    validModel["url"] = "TEST";
    var updatedModel = JSON.parse(JSON.stringify(validModel));
    updatedModel["url"] = "UPDATEDTEST";

    describe(name + " model tests", function () {

      describe('CRUD', function () {

        it('CREATE: should create a ' + name, function (done) {
          sails.models[name].create(validModel)
            .then(function () {
              done();
            }).catch(done);
        });

        it('READ: should find the created ' + name, function (done) {
          sails.models[name].find({
            "url": validModel.url
          })
            .then(function (results) {
              var saved = results[0];
              assert.equal(validModel.url, saved.url);
              done();
            }).catch(done);
        });

        it('UPDATE: should update the created ' + name, function (done) {
          sails.models[name].update({
            "url": validModel.url
          }, updatedModel)
            .then(function (results) {
              var saved = results[0];
              assert.equal(updatedModel.url, saved.url);
              done();
            }).catch(done);

        });

        it("DELETE: should delete the created " + name, function (done) {
          sails.models[name].destroy(updatedModel)
            .then(function () {
              sails.models[name].find({
                "url": updatedModel.url
              })
                .then(function (results) {
                  assert.equal(0, results.length);
                  done();
                })
                .catch(done);
            }).catch(done);
        });

      });

    });
  }

};


