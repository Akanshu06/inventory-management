import { Server } from 'socket.io';
import http from 'http';

const io = new Server(http.createServer(), {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

export default io;