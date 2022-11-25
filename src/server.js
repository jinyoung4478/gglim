import http from 'http'; // nodejs 내장
import WebSocket from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

// routing
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); // server access 가능

const ws = new WebSocket.Server({ server });

ws.on('connection', socket => {
   console.log('Connected to Browser ✅');
   socket.on('close', () => {
      console.log('Disconnected from the Browser ❌');
   });
   socket.on('message', message => {
      console.log('New message from browser: ', message.toString('utf-8'));
   });
   socket.send('hello!');
});

server.listen(3000, handleListen);
