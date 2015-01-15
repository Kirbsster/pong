var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var path = require('path');
var debug = require('debug')('pong');



//routes
var router = express.Router();

//var MousePos = require('js/MousePos');

/* GET home page. */
var routes = router.get('/', function(req, res) {
  res.render('index', { title: 'PONG' , MouseXPos: '0'});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//apply middleware function when / is accessed
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);

//activate port
app.set('port', process.env.PORT || 3000);

io.on('connection',function(socket){
	console.log('a user has connected');
	socket.on('disconnect',function(){
		console.log('user disconnected');
	});
	socket.on('mouseXPosFromBrowser', function(mousePosition){
		socket.emit('mouseXPosFromServer',mousePosition)
	});
});

//start server
var server = http.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
