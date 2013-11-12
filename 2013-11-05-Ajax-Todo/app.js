require('./models/priority');//when app.js loads it'll see that file, read it and create that model so we can use it later on.
require('./models/todo');

// express application
var home = require('./routes/home');
var todos = require('./routes/todos');
var priorities = require('./routes/priorities');
var games = require('./routes/games');

// modules
var express = require('express');
var http = require('http');
var path = require('path');
var less = require('express-less');
var mongoose = require('mongoose');
var app = express();
mongoose.connect('mongodb://localhost/ajax-todo');//we need to connect ot our database using a kind of strange url
//but the db doesn't get created until you do your first save.

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/less', less(__dirname + '/less', { compress: true }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// route definitions
app.get('/', home.index);
app.get('/todos', todos.index);
app.post('/priorities', priorities.create);
app.post('/todos', todos.create);
app.delete('/todos/:id', todos.delete);
app.put('/todos/:id/completed', todos.completed);


// start server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
