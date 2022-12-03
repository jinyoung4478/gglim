import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';
import path from 'path';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());

app.use('/views', express.static(path.resolve(__dirname, 'views')));
app.use('/static', express.static(path.resolve(__dirname, 'views', 'static')));
app.get('/*', (_, res) => res.render('index'));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on('connection', socket => {
   socket.on('joinRoom', roomName => {
      socket.join(roomName);
      socket.to(roomName).emit('welcome');
   });
   socket.on('offer', (offer, roomName) => {
      socket.to(roomName).emit('offer', offer);
   });
   socket.on('answer', (answer, roomName) => {
      socket.to(roomName).emit('answer', answer);
   });
   socket.on('ice', (ice, roomName) => {
      socket.to(roomName).emit('ice', ice);
   });
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);

httpServer.listen(3000, handleListen);
