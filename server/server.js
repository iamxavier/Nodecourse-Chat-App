// Imports 
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// Local Modules
const {generateMessage} = require('./utils/message')

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
        callback('This is from the server');
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()    
        // })

        // socket.broadcast.emit('newMessage', generateMessage(message.from, message.text));
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