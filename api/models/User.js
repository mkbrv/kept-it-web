/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    email: {
      type: 'email',
      required: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true,
      password: true
    },

    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },



  types: {
    password: function (value) {
      return _.isString(value) && value.length >= 6 && value.match(/[a-z]/i) && value.match(/[0-9]/);
    }
  },

  beforeCreate: function (values, cb) {
    // Hash password TODO: move salt to config, somewhere in the environment
    bcrypt.hash(values.password, "$2a$10$llw0G6IyibUob8h5XRt9xuRczaGdCm/AiV6SSjf5v78XS824EGbh.", null, function (err, hash) {
      if (err) return cb(err);
      values.password = hash;
      cb();
    });
  }
};
