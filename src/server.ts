import http from 'http';
import app from './app';
import { Server } from 'socket.io';

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

import './socket'; // socket setup

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});