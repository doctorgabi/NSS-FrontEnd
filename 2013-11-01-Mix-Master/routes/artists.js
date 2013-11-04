var mongoose = require('mongoose');
var Song = mongoose.model('Song');
var Artist = mongoose.model('Artist');

/*
 * GET /artists
 */

exports.index = function(req, res){
  Artist.find(function(err, artists){
    res.render('artists/index', {title: 'Artists', artists: artists});
  });
};


/*
 * GET /artists/new
 */

exports.new = function(req, res){
  Song.find(function(err, songs){
    res.render('artists/new', {title: 'New Artist', songs: songs});
  });
};

/*
 * POST /artists
 */

exports.create = function(req, res){
  new Artist(req.body).save(function(err, artist, count){
    if(err){
      res.render('artists/new', {title: 'New Artist', error: err, artist: new Artist()});
    }else{
      res.redirect('/artists');
    }
  });
};
/*
 * GET /artists/:id
 */

exports.show = function(req, res){
  Artist.findById(req.params.id, function(err, artist){
    res.render('artists/show.jade', {title: 'Express', artist: artist});
  });
};

/*
 * DELETE /artists/:id
 */

exports.delete = function(req, res){
  console.log('params = ' + req.params.id);
  Artist.findByIdAndRemove(req.params.id, function(err, post){
    res.redirect('/artists');
  });
};

/*
 * PUT /artists/:id
 */

exports.update = function(req, res){
  res.redirect('/artists' + req.params.id);
};