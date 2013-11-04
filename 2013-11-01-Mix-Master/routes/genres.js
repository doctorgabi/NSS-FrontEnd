var mongoose = require('mongoose');
var Genre = mongoose.model('Genre');
/*
 * GET /genres
 */

exports.index = function(req, res){
  Genre.find(function(err, genres){
    res.render('genres/index', {title: 'Genres', genres: genres});
  });
};


/*
 * GET /genres/new
 */

exports.new = function(req, res){
  var genre = new Genre();
  res.render('genres/new', {title: 'New Genre', genre: new Genre()});
};
//in this case no errors are passed to render the file but the one below does. so in the jade file you check if there were errors passed in.
//a blank genre object is passed in on 'new' and a real genre object is passed in on the 'edit' that it found in the db.
/*
 * POST /genres
 */

exports.create = function(req, res){
  new Genre(req.body).save(function(err, genre, count){
    if(err){
      res.render('genres/new', {title: 'New Genre', errors: err, song: new Genre()});
    }else{
      res.redirect('/genres');
    }
  });
};
//the only thing in the body is the genre name so we don't need to say more than req.body


/*
 * GET /genres/:id/edit
 */

exports.edit = function(req, res){
  Genre.findById(req.params.id, function(err, genre){
    res.render('genres/edit', {title: 'Edit Genre', genre: genre});
  });
};


/*
 * PUT /genres/:id
 */

exports.update = function(req, res){
  Genre.findByIdAndUpdate(req.params.id, req.body, function(err, genre){
    res.redirect('/genres');
  });
};
//find this guy (params)and once you found him update with what's in here(body)

//passed an empty new Genre() in two places, in new when it's empty and when you go to save something

