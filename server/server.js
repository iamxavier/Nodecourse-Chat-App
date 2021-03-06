// Imports 
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Local Modules
const {generateMessage, generateLocationMessage} = require('./utils/message')

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

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'))

    socket.on('createMessage', (message, callback)=>{
        console.log('Incoming message', message);
        io.emit('newMessage', generateMessage(message.from, message.text)); 
        callback();
      
    })
    
    socket.on('createLocationMessage', (coords)=>{
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude))
    })

    // socket.emit('newMessage', {
    //     from: 'Xavier',
    //     text: "Course is going good",
    //     createdAt: new Date().getTime()
    // })
    socket.on('disconnect', ()=>{
    console.log('Disconnected successfully')
})
});



server.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})