import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { userRouter } from './routers';

const app = express();

app.use(express.json());

app.use('/public', express.static(__dirname + '/../public'));
app.use('/frontend', express.static(__dirname + '/../frontend'));
app.use('/components', express.static(__dirname + '/../frontend/components'));
app.use('/pages', express.static(__dirname + '/../frontend/pages'));

app.use('/api/users', userRouter);

app.get('/*', function (_, res) {
   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', socket => {
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

export default httpServer;
