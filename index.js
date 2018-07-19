var express = require('express');
var socket = require('socket.io');

// App Setup
var app = express();
var server = app.listen(4000, function(){
    console.log("listening to request on port 4000")
});


// Static Files
app.use(express.static('public'))

// Socket setup
var io = socket(server);

io.on('connection', function(socket){
    console.log('Made Socket Connection', socket.id);
    
    // Handle chat event
    socket.on('chat', function(data){
        io.sockets.emit('chat', data);
    });

    // Typing message
    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data)
    })
});
