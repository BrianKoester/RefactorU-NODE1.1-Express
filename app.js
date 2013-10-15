
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
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

// serve a static file
app.get('/', function(req, res){
	fs.readFile(__dirname + '/form.html', function(err, data){
		res.setHeader('Content-Type', 'text/html')
		res.send(data)
	})
});

// app.get('/', routes.index);
// app.get('/users', user.list);

app.get('/hi', function(req, res) {
	res.send('<h1>Hi!!!</h1>');
});

app.get('/hey', function(req, res) {
	res.send('<h2>HEY</h2>');
});

app.get('/another', function(req, res) {
	res.send('*** Another Message ***');
});

app.post('/formsubmit', function(req, res){
	res.redirect('/success')
});

app.get('/success', function(req, res){
	res.send('<h1>Successful Submission!</h1>')
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
