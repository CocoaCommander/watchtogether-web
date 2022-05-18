import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/HomePage/Home';
import Room from './pages/RoomPage/Room';

function App() {
  const [isHost, setIsHost] = useState(false);
  const [socketURL, setSocketURL] = useState("");
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");

  // test state change
  useEffect(() => {
    console.log(roomCode)
  }, [roomCode])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home setUsername={setUsername} username={username} setRoomCode={setRoomCode}/>}/>
        <Route path='/:roomid' element={<Room />}/>
      </Routes>
    </>
  );
}

export default App;
