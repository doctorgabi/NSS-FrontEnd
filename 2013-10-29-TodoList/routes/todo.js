var database = require('../modules/database')
/*
 * GET /todo.
 */

exports.index = function(req, res){
  var todos = database.read(__dirname + '/../db/todo.json');
  res.render('todo/index', { title: 'List: To Do List', todos: todos});//these are property value pairs, we declared two properties title and todos, and then set the values, in the first case to a string and in the second case to the variable that's the database we just set.
};

/*
 * GET /todo/new.
 */

exports.new = function(req, res){
  res.render('todo/new', { title: 'New: To Do List'});
}

/*
 * POST /todo
 */

exports.create = function(req, res){
  var color = req.body.color;
  var task = req.body.task;
  var due = req.body.due;

  var todos = database.read(__dirname + '/../db/todo.json');

  var todo = {color: color, task: task, due: due};
  todos.push(todo);

  database.write(__dirname + '/../db/todo.json', todos);
  res.redirect('/todo');
};