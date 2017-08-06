 var socket = io();

   socket.on('connect', function (){
       console.log('connected to server');
       
       socket.emit('createMessage', {
           from: 'Andrew',
           text: 'Its going great'
       })
   });

   socket.on('newMessage', function(message){
       console.log('New message', message);
   })


   socket.on('disconnect', function (){
       console.log('Disconnected from server')
   })
 