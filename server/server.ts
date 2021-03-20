import express, { Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

io.sockets.on('connection', (socket: Socket) => {
  console.log('A user has connected');

  socket.on('message', (message) => {
    console.log(`message: ${message}`);
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server running on localhost port 5000');
});
