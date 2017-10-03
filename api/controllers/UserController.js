/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  welcome: function (req, res) {
    res.view("user/welcome");
  },

  /**
   * `UserController.login()`
   */
  login: function (req, res) {
    return res.login({
      email: req.param('email'),
      password: req.param('password'),
      successRedirect: '/',
      invalidRedirect: '/login'
    });
  },


  /**
   * `UserController.logout()`
   */
  logout: function (req, res) {

    req.session.destroy(function(err) {
      if (req.wantsJSON) {
        return res.ok('Logged out successfully!');
      }

      return res.redirect('/');
    });
  },


  /**
   * `UserController.signup()`
   */
  signup: function (req, res) {
    var user = {
      name: req.param('name'),
      email: req.param('email'),
      password: req.param('password')
    };

    AuthenticationService.register(user, function (err, user) {

      if (err) return res.negotiate(err);
      req.session.me = user.id;

      if (req.wantsJSON) {
        return res.ok('OK!');
      }
      return res.redirect('/welcome');
    });

  }
};
