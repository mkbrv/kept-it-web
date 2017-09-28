/**
 * BookmarksController
 *
 * @description :: Server-side logic for managing bookmarks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  findOne: function (req, res) {
    var id = Bookmarks.mongo.objectId(req.param("id"));
    Bookmarks.findOne({"id": id})
      .exec(function (err, found) {
        if (err) throw err;
        return res.json(found);
      });
  }

};

