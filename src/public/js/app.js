const socket = io();

const welcome = document.querySelector('#welcome');
const form = welcome.querySelector('form');

const backendDone = msg => {
   console.log('Backend Done:', msg);
};

const handleRoomSubmit = e => {
   e.preventDefault();
   const input = form.querySelector('input');
   socket.emit('enterRoom', input.value, backendDone);
   input.value = '';
};

form.addEventListener('submit', handleRoomSubmit);
