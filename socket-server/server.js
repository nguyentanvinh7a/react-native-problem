// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server); // Tạo một instance của Socket.IO

// Xử lý sự kiện kết nối từ client
io.on('connection', (socket) => {
  console.log('New client connected');

  // Nhận tin nhắn từ client và phát lại cho tất cả các client khác
  socket.on('sendMessage', (message) => {
    io.emit('message', message);
  });

  // Xử lý khi client ngắt kết nối
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Đặt server để nghe ở cổng 4000
server.listen(4000, () => {
  console.log('Listening on port 4000');
});