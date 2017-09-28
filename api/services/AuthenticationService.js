var bcrypt = require('bcrypt-nodejs');
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
   * TODO: move salt to config, somewhere in the environment
   * Login with inputs email and password
   * @param inputs array
   * @param cb function callback for successful login
   */
  login: function (inputs, cb) {
    bcrypt.hash(inputs.password, "$2a$10$llw0G6IyibUob8h5XRt9xuRczaGdCm/AiV6SSjf5v78XS824EGbh.", null, function (err, hash) {
      if (err) return cb(err);
      User.findOne({
        email: inputs.email,
        password: hash
      }).exec(cb);
    });

  }

};
