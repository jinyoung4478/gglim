import express from 'express';
import path from 'path';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { userRouter, authRouter } from './routers';
import { errorHandler } from './middlewares';
import './db';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// API 라우팅
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// 가상 경로 접두부를 이용한 정적 리소스 마운팅
app.use('/public', express.static(__dirname + '/../public'));
app.use('/frontend', express.static(__dirname + '/../frontend'));
app.use('/components', express.static(__dirname + '/../frontend/components'));
app.use('/pages', express.static(__dirname + '/../frontend/pages'));
app.use('/services', express.static(__dirname + '/../frontend/services'));
app.use('/utils', express.static(__dirname + '/../frontend/utils'));
// 기본 HTML 파일 라우팅
app.get('/*', function (_, res) {
   res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
app.use(errorHandler);

// http & ws 서버 설정
const server = createServer(app);
const io = new Server(server);

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

export default server;
