var Promise = require("bluebird");
var bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

// api/services/AuthenticationService.js
module.exports = {

  register: function (inputs, cb) {
    User.create({
      name: inputs.name,
      email: inputs.email,
      password: inputs.password
    }).exec(cb);
  },

  /**
   *
   * Finds user by email and validates password hashes;
   * @param email
   * @param password
   * @return Promise
   */
  authenticate: function (email, password) {
    return new Promise(function (resolve, reject) {

      var promisedUser;

      return User.findOne({
        email: email
      })
        .then(function (user) {
          //validate password hashes
          promisedUser = user;
          return bcrypt.compareAsync(password, user.password);
        })
        .catch(function (err) {
          reject(new Error("Email not found"));
        })
        .then(function (result) {
          if (result) {
            resolve(promisedUser)
          } else {
            reject(new Error("Invalid Password"));
          }
        });
    });
  }

};
