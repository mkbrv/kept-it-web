/**
 * res.login([inputs])
 *
 * @param {String} inputs.username
 * @param {String} inputs.password
 *
 * @description :: Log the requesting user in using a passport strategy
 * @help        :: See http://links.sailsjs.org/docs/responses
 */

module.exports = function login(inputs) {
  inputs = inputs || {};

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  AuthenticationService.authenticate(inputs.email, inputs.password)
    .then(function (user) {
      req.session.me = user.id;

      if (req.wantsJSON || !inputs.successRedirect) {
        //for API's
        return res.ok();
      }

      //for web
      return res.redirect("/welcome");
    })
    .catch(function () {
      if (req.wantsJSON || !inputs.invalidRedirect) {
        //for API's
        return res.badRequest('Invalid username/password combination.');
      }

      //for web
      return res.redirect(inputs.invalidRedirect);
    });

};
