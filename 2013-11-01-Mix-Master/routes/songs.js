var mongoose = require('mongoose');
var Song = mongoose.model('Song');
/*
 * GET /songs
 */

exports.index = function(req, res){
  Song.find(function(err, songs){
    res.render('songs/index', {title: 'Songs', songs: songs});
  });
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
  // console.log('--before--');
  // console.log(req.body);
  req.body.genres = req.body.genres.split(', ');
  new Song(req.body).save(function(err, song, count){
    // console.log('--after--');
    // console.log(song);
    res.redirect('/songs');
  });
};

/*
 * GET /songs/:id
 */

exports.show = function(req, res){
  Song.findById(req.params.id, function(err, song){
    res.render('songs/show.jade', {title: 'Express', song: song});
  });
};

/*
 * DELETE /songs/:id
 */

exports.delete = function(req, res){
  console.log('params = ' + req.params.id);
  Song.findByIdAndRemove(req.params.id, function(err, post){
    res.redirect('/songs');
  });
};