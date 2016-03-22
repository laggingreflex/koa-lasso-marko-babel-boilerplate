import { io } from 'server';

io.on('connection', ({ socket, user }) => {
  console.info('Socket client connected');
  socket.on('disconnect', () => console.info('Socket client disconnected'));
  socket.on('reconnect', () => console.info('Socket client reconnected'));
});


io.on('data', ({ socket, user }) => {
  console.log('Socket client requested data');
  socket.emit('data', {
    hash: 'key',
    one: 1,
    two: 2,
    three: 3,
    date: Date.now(),
  })
});
