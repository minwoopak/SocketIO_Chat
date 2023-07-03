import { Server } from 'socket.io';

const io = new Server(3000, {
	cors: {
		origin: ['http://localhost:5173'],
	}
});

// const io = require('socket.io')(3000, {
// 	cors: {
// 		origin: [ 'http://localhost:5173' ]
// 	}
// });

io.on('connection', (socket) => {
	console.log(socket.id);
	socket.on("send-message", ( message, room ) => {
		if ( room == "" ){
		  socket.broadcast.emit('receive-message', message);
		} else {
		  socket.to(room).emit('receive-message', message);
		}
	});
	socket.on('join-room', ( room, callBack ) => {
		socket.join(room);
		callBack(`Joined ${room}`);
	});
	io.on('connection', (socket) => {
		socket.on('ping', n => console.log(n) );
	});
});


console.log('hi');
