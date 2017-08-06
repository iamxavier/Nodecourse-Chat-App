// Imports 
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


//Configurations 
const port = process.env.PORT || 3000;
const publichPath = path.join(__dirname, "../public");

// console.log(__dirname + "/../public");
// console.log(publichPath)

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publichPath));


io.on('connection', (socket)=>{
    console.log('New user connected');

    socket.on('disconnect', ()=>{
    console.log('Disconnected successfully')
})
});



server.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})