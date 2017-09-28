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
   * @param email
   * @param password
   * @returns promise {*}
   */
  authenticate: function (email, password) {
    return new Promise(function (resolve, reject) {
      var promisedUser;
      return User.findOne({
        email: email
      }).then(function (user) {
        promisedUser = user;
        return bcrypt.compareAsync(password, user.password);
      }).catch(function (err) {
        reject(false);
      }).then(function (result) {
        if (result) {
          resolve(promisedUser)
        } else {
          reject(false);
        }
      });
    });

  }

};
