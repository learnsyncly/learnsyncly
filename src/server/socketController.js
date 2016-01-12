//takes a socket io server object
module.exports = function(io) {

  //event listener that detects socket.io connection event
  io.on('connection', function(socket){
    console.log('A user connected:');
    //send back socket id on first connection
    socket.emit('connection successful', socket.id);
    //log when a user has disconnected
    socket.on('disconnect', function () {
      console.log('User disconnected.');
    });
  });
};
