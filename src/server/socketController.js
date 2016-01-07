//takes a socket io server object
module.exports = function(io){

  //event listener that detects socket.io connection event
  io.on('connection', function(socket){
    console.log('A user connected');
    //send back socket id on first connection
    socket.emit('connection successful', socket.id);

    socket.on('joinroom', function(message) {
      socket.join(message.roomname);
      io.to(message.roomname).emit('clientjoinroom', message);
    });

    socket.on('inroom', function(message) {
      io.to(message.roomname).emit('clientinroom', message);
    });

    socket.on('message', function(message) {
      io.to(message.roomname).emit('clientmessage', message);
    });

    socket.on('auth', function(message) {
      io.to(message.roomname).emit('clientauth', message);
    });

  });


};
