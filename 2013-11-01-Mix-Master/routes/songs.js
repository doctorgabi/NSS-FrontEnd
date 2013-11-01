var mongoose = require('mongoose');
var Song = mongoose.model('Song');
/*
 * GET /songs
 */

exports.index = function(req, res){
  res.render('songs/index', {title: 'Songs'});
};


/*
 * GET /songs/new
 */

exports.new = function(req, res){
  res.render('songs/new', {title: 'New Song'});
};

/*
 * POST /songs
 */

exports.create = function(req, res){
  console.log('--before--');
  console.log(req.body);
  new Song(req.body).save(function(err, song, count){
    console.log('--after--');
    console.log(song);
    res.redirect('/songs');
  });
};