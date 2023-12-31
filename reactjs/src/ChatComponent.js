import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const ChatComponent = ({ idCurentChatNow }) => {
  const [data, setData] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setData((prev) => prev + 'tiếp');
    }, 1000); // Chú ý: 10ms là quá nhanh, có thể bạn muốn là 10000ms (10 giây) hoặc một khoảng thời gian khác.

    // Hàm dọn dẹp để hủy setInterval khi component bị unmount hoặc trước khi useEffect chạy lại.
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleMessage = (message) => {
      setData((prev) => prev + message);
    };

    socket.on(idCurentChatNow, handleMessage);

    // Hàm dọn dẹp để hủy lắng nghe sự kiện khi component bị unmount hoặc trước khi useEffect chạy lại.
    return () => socket.off(idCurentChatNow, handleMessage);
  }, [idCurentChatNow]); // Thêm idCurentChatNow vào danh sách phụ thuộc để đảm bảo rằng socket.on được thiết lập lại khi idCurentChatNow thay đổi.

  return (
    <div>
      <p>Messages: {data}</p>
    </div>
  );
};

export default ChatComponent;