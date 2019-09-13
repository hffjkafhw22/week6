const express = require('express');// Import exprerss.js
const app = express(); //The app object conventionally denotes the Express application. Create it by 
//const cors = require('cors');
//const http = require('http').Server(app);
const server = require('http').createServer(app);     

const io = require('socket.io').listen(server);

//const sockets = require('./socket.js');
               //calling the top-level express() function exported by the Express module.

users = [];
connections = [];

server.listen(process.env.PORT || 3000);

console.log('server running on port 3000.');

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('User Connected: %s online', connections.length);

    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('User disconneted: %s online', connections.length);
    });
    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg:data});
    });
});