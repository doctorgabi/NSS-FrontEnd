var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var moment = require('moment');
/*
 * GET /posts
 */

exports.index = function(req, res){
  Post.find(function(err, posts){
    res.render('posts/index', {title: 'Posts', posts: posts});
  });
};


/*
 * GET /posts/new
 */

exports.new = function(req, res){
  var date = moment().format("MMM Do YYYY, h:mm a");
  res.render('posts/new', {title: 'New', date: date});
};


/*
 * POST /posts
 */

exports.create = function(req, res){
  console.log('before save');
  console.log(req.body);
  new Post(req.body).save(function(err, post, count){
    console.log('after save');
    console.log(post);
    res.redirect('/posts');
  });
};

/*
 * GET /posts/:id/edit
 */

exports.edit = function(req, res){
  res.render('posts/edit', {title: 'Edit'});
};


/*
 * PUT /posts/:id
 */

exports.update = function(req, res){
  res.redirect('/posts' + req.params.id);//this redirect is a url so nees a / before it
};


/*
 * GET /posts/:id
 */

exports.show = function(req, res){
  Post.findById(req.params.id, function(err, post){
    res.render('posts/show.jade', {title: 'Express', post: post});
  });
};


/*
 * DELETE /posts/:id
 */

exports.delete = function(req, res){
  console.log('params = ' + req.params.id);
  Post.findByIdAndRemove(req.params.id, function(err, post){
    res.redirect('/posts');
  });
};