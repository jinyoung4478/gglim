import http from 'http'; // nodejs 내장
import SocketIO from 'socket.io';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));

// routing
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app); // server access 가능
const wsServer = SocketIO(httpServer);

wsServer.on('connection', socket => {
   socket.on('enterRoom', (roomName, done) => {
      console.log(roomName);
      setTimeout(() => {
         done('hhh');
      }, 3000);
   });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);

httpServer.listen(3000, handleListen);
