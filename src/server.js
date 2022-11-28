import http from 'http';
import SocketIO from 'socket.io';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

function publicRooms() {
   const {
      sockets: {
         adapter: { sids, rooms },
      },
   } = wsServer;
   // public room list
   const publicRooms = [];
   rooms.forEach((_, key) => {
      if (sids.get(key) === undefined) {
         publicRooms.push(key);
      }
   });
   return publicRooms;
}

wsServer.on('connection', socket => {
   socket['nickname'] = 'Anon';
   socket.onAny(event => {
      console.log(`Socket Event: ${event}`);
   });
   socket.on('enter_room', (roomName, done) => {
      socket.join(roomName);
      done();
      socket.to(roomName).emit('welcome', socket.nickname); // send message everybody except for me
      // 모든 소켓에 메세지 보내기
      wsServer.sockets.emit('room_change', publicRooms());
   });
   socket.on('disconnecting', () => {
      socket.rooms.forEach(room => socket.to(room).emit('bye', socket.nickname));
      // disconnecting event는 socket이 방을 떠나기 직전에 실행되는 것
      // 따라서 이 emit은 disconnecting 전에 일어남
      // 완전 연결 종료 이후 event를 발생시키려면 disconnect를 사용
      //wsServer.sockets.emit('room_change', publicRooms());
   });
   socket.on('disconnect', () => {
      wsServer.sockets.emit('room_change', publicRooms());
   });
   socket.on('newMessage', (msg, room, done) => {
      socket.to(room).emit('newMessage', `${socket.nickname}: ${msg}`);
      done();
   });
   socket.on('nickname', nickname => (socket['nickname'] = nickname));
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);

httpServer.listen(3000, handleListen);
