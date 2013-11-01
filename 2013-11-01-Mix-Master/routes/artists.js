// var mongoose = require('mongoose');
// var Song = mongoose.model('Song');
/*
 * GET /artists
 */

exports.index = function(req, res){
  res.render('artists/index', {title: 'Artists'});
};


/*
 * GET /artists/new
 */

exports.new = function(req, res){
  res.render('artists/new', {title: 'New Artist'});
};

/*
 * POST /artists
 */

exports.create = function(req, res){
  res.redirect('/artists');
};