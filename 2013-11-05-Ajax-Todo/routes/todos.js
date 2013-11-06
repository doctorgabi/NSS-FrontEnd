var mongoose = require('mongoose');
var Priority = mongoose.model('Priority');
var Todo = mongoose.model('Todo');
var moment = require('moment');


/*
 * GET /todos
 */
//this action gets called on page load, ne, so query the db
exports.index = function(req, res){
  Priority.find(function(priorityErr, priorities){
    Todo.find().populate('priority').exec(function(todoErr, todos){
      res.render('todos/index', {title: 'Express', priorities: priorities, todos: todos, moment: moment});
    });
  });
};
//how can we change our jade so on page load we get our options showing up...

/*
 * POST /todos
 */

exports.create = function(req, res){
  new Todo(req.body).save(function(err, todo, count){
    Todo.findById(todo.id).populate('priority').exec(function(err, todo){
      res.send(todo);//it's purpose is to send back JSON
    });
  });//this code will print out to your terminal
};

/*
 * DELETE /todos/:id
 */

exports.delete = function(req, res){
  Todo.findByIdAndRemove(req.params.id, function(err, todo){
    res.send(todo);
  });
};

/*
 * PUT /todos/:id/complete
 */

exports.completed = function(req, res){
  Todo.findById(req.params.id, function(err, todo){
    todo.completed = !todo.completed;
    todo.save(function(err, todo){
      res.send(todo);
    });
  });
};