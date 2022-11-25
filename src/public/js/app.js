const socket = new WebSocket(`ws://${window.location.host}`); // 연결된 server를 의미함

socket.addEventListener('open', () => {
   console.log('Connected to Server ✅');
});

socket.addEventListener('message', message => {
   console.log('New message: ', message.data, 'from the Server');
});

socket.addEventListener('close', () => {
   console.log('Disconnected to Server ❌');
});

setTimeout(() => {
   socket.send('3초 경과! Here is browser!');
}, 3000);
