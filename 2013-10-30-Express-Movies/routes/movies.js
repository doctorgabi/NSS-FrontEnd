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

/*
 * GET /movies/new
 */
exports.new = function(req, res){
  res.render('movies/new', { title: 'New: Movie'});
}

/*
 * POST /movies
 */
exports.create = function(req, res){
  var title = req.body.title;
  var image = req.body.image;
  var color = req.body.color;
  var rated = req.body.rated;
  var studio = req.body.studio;
  var gross = req.body.gross;
  var numTheatres = req.body.numTheatres;

  var movies = db.read(__dirname + '/../db/movies.json');

  var movie = {title: title, image: image, color: color, rated: rated, studio: studio, gross: gross, numTheatres: numTheatres};
  movies.push(movie);

  db.write(__dirname + '/../db/movies.json', movies);
  res.redirect('/movies');
};