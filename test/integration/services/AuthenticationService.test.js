var assert = require('chai').assert;


describe("AuthenticationService", function () {

  describe('An user ', function () {

    var mockUser = {
      "name": "name",
      "email": "test@test.com",
      "password": "testpass1word"
    };

    it('should be able to register', function (done) {
      AuthenticationService.register(mockUser, function (err) {
        if (err) {
          throw err;
        }
        User.findOne({"email": mockUser.email}).exec(function (err, user) {
          if (err) {
            throw err;
          }
          assert.equal(mockUser.email, user.email);
          done();
        });

      });
    });

    it('should not be able to register twice', function (done) {
      AuthenticationService.register(mockUser, function (err) {
        assert.isObject(err);
        done();
      });
    });


    it('should have the password encrypted during registration', function (done) {
      User.findOne({"email": mockUser.email}).exec(function (err, user) {
        if (err) {
          throw err;
        }
        assert.notEqual(mockUser.password, user.password);
        done();
      });
    });

    it('should be able to login', function (done) {
      AuthenticationService.authenticate(mockUser.email, mockUser.password)
        .then(function (user) {
          assert.isObject(user);
          done();
        });
    });

    it('should not serialize password', function (done) {
      AuthenticationService.authenticate(mockUser.email, mockUser.password)
        .then(function (user) {
          assert.isUndefined(user.toJSON().password);
          done();
        });
    });

    it('should not authenticate invalid password', function (done) {
      AuthenticationService.authenticate(mockUser.email, "random")
        .catch(function (err) {
          assert.instanceOf(err, Error);
          done();
        });
    });

    it('should not accept less than 6 characters password', function (done) {
      AuthenticationService.register({
        "name": "name",
        "email": "invalid@test.com",
        "password": "test"
      }, function (err) {
        assert.isNotNull(err.invalidAttributes.password);
        assert.equal("minLength", err.invalidAttributes.password[0].rule);
        done();
      });

    });

    it('should not accept passwords that contain only letters', function (done) {
      AuthenticationService.register({
        "name": "name",
        "email": "invalid@test.com",
        "password": "testasdadsasdas"
      }, function (err) {
        assert.isNotNull(err.invalidAttributes.password);
        assert.equal("password", err.invalidAttributes.password[0].rule);
        done();
      });

    });

  });

});
