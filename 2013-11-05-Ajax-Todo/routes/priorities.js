var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');
/*
 * POST /priorities
 */

exports.create = function(req, res){
  new Priority(req.body).save(function(err, priority, count){
    res.send(priority);//it's purpose is to send back JSON
  });
};
