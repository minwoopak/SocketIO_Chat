import { io } from 'socket.io-client';

const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

const socket = io('http://localhost:3000');
socket.on('connect', () => {
	console.log(socket.id);
	displayMessage(`You connected with id: ${socket.id}`);
});

socket.on('receive-message', (message) => {
	displayMessage(message);
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const message = messageInput.value;
	const room = roomInput.value;

	if (message === '') return;
	displayMessage(message);
	socket.emit('send-message', message, room);

	messageInput.value = '';
});

joinRoomButton.addEventListener('click', () => {
	const room = roomInput.value;
	socket.emit('join-room', room, message => {
	  displayMessage(message)
	});
});

function displayMessage(message) {
	const div = document.createElement('div');
	div.textContent = message;
	const container = document.getElementById('message-container');
	container.append(div);
}

let count = 0;
setInterval(() => {
	socket.volatile.emit("ping", ++count)
}, 1000);

document.addEventListener("keydown", e => {
	// ignore key press when in input element
	if (e.target.matches("input")) return;

	if (e.key === "c") socket.connect();
	if (e.key === "d") socket.disconnect();
});
