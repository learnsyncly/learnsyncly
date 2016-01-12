var config = require('./server/config.js');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var SocketServer = require('socket.io');
var socketController = require('./server/socketController.js');

//new express app
var app = express();

//set port
var port = process.env.PORT || 3000;

//returns http server instance to use with socket.io
var httpServer = app.listen(port, function() {
  console.log('Listening on', port);
});


// *** config middleware *** //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// *** mongoose *** //
mongoose.connect(config.MONGO_URI);
mongoose.connection.on('error', function(err) {
  console.log('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

// *** routes *** //
var authRoutes = require('./server/routes/auth');

// *** main routes *** //
app.use('/auth', authRoutes);


// use https when deployed to heroku
// note headers can be spoofed so this isn't very reliable
// but req.secure doesn't work in heroku
var checkHerokuHTTPS = function(req, res, next) {
  var ip = req.ip;
  if (ip !== '::ffff:127.0.0.1' && ip != '::1') {
    if (req.header('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.headers.host + req.url);
    }
  }
  next();
};

app.use(checkHerokuHTTPS);

//pass in http server to socket.io which creates a socket.io server
var io = new SocketServer(httpServer);

//use static routes for single page app
app.use(express.static(__dirname + '/public'));


//call socketContoller passing in socket.io server
socketController(io);
