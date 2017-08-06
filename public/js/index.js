 var socket = io();

   socket.on('connect', function (){
       console.log('connected to server');
       
    //    socket.emit('createMessage', {
    //        from: 'Andrew',
    //        text: 'Its going great'
    //    })
   });

   socket.on('newMessage', function(message){
       console.log('New message', message);
       var li = $('<li></li>');
       li.text(`${message.from}: ${message.text}`)
       $('#messages').append(li);
   })


   socket.on('disconnect', function (){
       console.log('Disconnected from server')
   })
 
//    socket.emit('createMessage',  {
//        from: 'esting thing',
//        text: 'Hi!'
//    }, function (data) {
//        console.log('Got it', data)
//    })

   $('#message-form').on('submit', function(e){
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: $('[name=message]').val()
        }, function (){

        })
   })