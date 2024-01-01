// App.tsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import io from 'socket.io-client';

const App = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const socket = io('http://192.168.1.72:4000', {
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('connected to socket server');
    });

    socket.on('message', (message) => {
      setData((prev) => prev + '\n' + message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={{ padding: 20 }}>
       <Text>ehehehe</Text>
      <Text>{data}</Text>
    </View>
  );
};

export default App;