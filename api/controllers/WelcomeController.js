/**
 * WelcomeController
 *
 * @description :: Simple controller for authenticated page
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  welcome: function (req, res) {
    res.view("user/welcome");
  }

};
