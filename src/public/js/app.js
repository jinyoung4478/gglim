const socket = new WebSocket(`ws://${window.location.host}`); // 연결된 server를 의미함

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector('form');
const roomNameTitle = document.querySelector('#roomNameTitle');

const room = document.querySelector('#room');
room.hidden = true;

const showRoom = roomName => {
   room.hidden = false;
   welcome.hidden = true;
   roomNameTitle.innerText = `Room ${roomName}`;
};

const handleRoomSubmit = e => {
   e.preventDefault();
   const input = form.querySelector('input');
   socket.emit('enterRoom', input.value, showRoom);
   input.value = '';
};

setTimeout(() => {
   socket.send('3초 경과! Here is browser!');
}, 3000);
