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
const nicknameForm = document.querySelector('#nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');
const nicknameButton = document.querySelector('#nicknameButton');
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

function handleNicknameSubmit(e) {
   e.preventDefault();
   socket.emit('nickname', nicknameInput.value);
}

roomNameForm.addEventListener('submit', handleRoomSubmit);
messageForm.addEventListener('submit', handleMessageSubmit);
nicknameForm.addEventListener('submit', handleNicknameSubmit);

socket.on('welcome', user => {
   addMessage(`${user} arrived!`);
});

socket.on('bye', left => {
   addMessage(`${left} left!`);
});

socket.on('newMessage', addMessage);

socket.on('room_change', console.log);
