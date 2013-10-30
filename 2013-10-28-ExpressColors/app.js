
/**
 * Module dependencies.
 */

var express = require('express');

var home = require('./routes/home');//says find this module or file and read it in. inside it it has a function called index so it knows about that now.

var http = require('http');
var path = require('path');
var colors = require('./routes/colors');
var app = express();

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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.index);//when someone does a get to the /path I want you to call the index method to the home variable. I want you to render out (turn into html) this jade file and send it back to the browser.
app.get('/colors', colors.index);
app.get('/colors/new', colors.new);
app.post('/colors', colors.create);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
