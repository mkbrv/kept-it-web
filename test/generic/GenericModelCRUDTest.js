var assert = require('assert');

module.exports = {

  runTests: function (name) {

    describe(name + " model tests", function () {

      describe('CRUD', function () {

        var bookmark = {
          "url": "TestCRUD" + name + "Model"
        };

        var updated = {
          "url": "UpdatedTestCRUD" + name + "Model"
        };

        it('CREATE: should create a bookmark', function (done) {
          sails.models[name].create(bookmark)
            .then(function (results) {
              done();
            }).catch(done);

        });

        it('READ: should find the created bookmark', function (done) {
          sails.models[name].find({
            "url": bookmark.url
          })
            .then(function (results) {
              var saved = results[0];
              assert.equal(bookmark.url, saved.url);
              done();
            })
            .catch(done);
        });

        it('UPDATE: should update the created bookmark', function (done) {
          sails.models[name].update(
            bookmark, updated)
            .then(function (results) {
              var saved = results[0];
              assert.equal(updated.url, saved.url);
              done();
            })
            .catch(done);

        });

        it("DELETE: should delete the created bookmark", function (done) {
          sails.models[name].destroy(updated)
            .then(function (results) {
              sails.models[name].find({
                "url": updated.url
              })
                .then(function (results) {
                  assert.equal(0, results.length);
                  done();
                })
                .catch(done);
            })
            .catch(done);
        });

      });

    });
  }

};


