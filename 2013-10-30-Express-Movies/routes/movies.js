var db = require('../modules/database');
var file = __dirname + '/../db/movies.json';
var Movie = require('../models/movie');
var _ = require('lodash');//when we type _.map it'll call this

/*
 * GET /movies
 */

exports.index = function(req, res){
  var genericMovies = db.read(file);
  var movies = _.map(genericMovies, function(genericMovie){
    return new Movie(genericMovie);
    });
    res.render('movies/index', {title: 'Movies', movies: movies});
  }
//need to loop over the genericMovies array and do a function that converts the objects in the array to 'genericMovie'

/*
 * DELETE /movies/Jaws (example movie url)
 */
exports.delete = function(req, res){
  var title = req.params.title;
  var movies = db.read(file);
  movies = _.reject(movies, function(movie){
    return movie.title === title;
  });
  db.write(file, movies);
  res.redirect('/movies');
}