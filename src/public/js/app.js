const socket = io();

const lobbyDiv = document.querySelector('#lobbyDiv');
const roomNameForm = document.querySelector('#roomNameForm');
const roomNameInput = document.querySelector('#roomNameInput');
const roomNameButton = document.querySelector('#roomNameButton');
const roomDiv = document.querySelector('#roomDiv');
const roomTitle = document.querySelector('#roomTitle');
const messageUl = document.querySelector('#messageUl');
const messageForm = document.querySelector('#messageForm');
const messageInput = document.querySelector('#messageInput');
const messageButton = document.querySelector('#messageButton');
let roomName;

roomDiv.hidden = true;

function addMessage(message) {
   const li = document.createElement('li');
   li.innerText = message;
   messageUl.append(li);
}

function showRoom() {
   lobbyDiv.hidden = true;
   roomDiv.hidden = false;
   roomTitle.innerText = `Room: ${roomName}`;
}

function handleRoomSubmit(e) {
   e.preventDefault();
   socket.emit('enter_room', roomNameInput.value, showRoom);
   roomName = roomNameInput.value;
   roomNameInput.value = '';
}

function handleMessageSubmit(e) {
   e.preventDefault();
   socket.emit('newMessage', messageInput.value, roomName, () => {
      addMessage(`You: ${messageInput.value}`);
      messageInput.value = '';
      messageInput.focus();
   });
}

roomNameForm.addEventListener('submit', handleRoomSubmit);
messageForm.addEventListener('submit', handleMessageSubmit);

socket.on('welcome', () => {
   addMessage('Someone joined!');
});

socket.on('bye', () => {
   addMessage('Someone left!');
});

socket.on('newMessage', addMessage);
