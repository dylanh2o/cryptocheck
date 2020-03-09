const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');



const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const server = http.Server(app);
const io = socketio(server);

io

	.on('connection', socket => {
		console.log('New client connection ', socket.id);

		socket.on('disconnect', () => {
			console.log('Client disconnected from websocket');

		});
	});


server.listen(3030, () => console.log('Server started on localhost:3030'));