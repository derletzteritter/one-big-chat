import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { users, removeUser } from './functions/user';
import cookieParser = require('cookie-parser');
import { router } from './auth/authRoutes';
import { createToken, maxAge } from './auth/lib/tokens';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});
app.use(router);

io.sockets.on('connection', (socket: any) => {
  console.log('A user has connected');

  socket.on(
    'message',
    ({ message, username }: { message: string; username: string }) => {
      io.emit('chatMessage', { message, username });
    },
  );

  socket.on('typing', (username: string) => {
    socket.broadcast.emit('isTyping', { message: `${username} is typing` });
  });

  socket.on('join', (username: string) => {
    socket.username = username;
    users.push(socket.username);
    io.emit('users.ts', users);

    // send message to everyone, except source
    socket.broadcast.emit('chatMessage', {
      message: `${username} has joined!`,
      username: 'System',
    });
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected');
    const user = removeUser(socket.username);

    socket.broadcast.emit('chatMessage', { message: `${user} has left!` });
  });
});

server.listen(PORT, () => {
  console.log('Server running on localhost port: ', PORT);
});
