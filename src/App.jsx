import './App.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from './pages/HomePage/Home';
import Room from './pages/RoomPage/Room';

function App() {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [socket, setSocket] = useState("");
  const [player, setPlayer] = useState(null);
  const [videoState, setVideoState] = useState(-1);
  const [incomingState, setIncomingState] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    let newSocket = new WebSocket(`ws://localhost:3001/sockets/video`);
    newSocket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        event = JSON.parse(event.data);

        switch(event.action) {
          case "success":
            navigate(`/${event.sessionId}`, {state: event.videoUrl})
            break;
          case "play":
            console.log(`video is playing`);
            setIncomingState("play");
            break;
          case "pause":
            console.log(`video is paused`);
            setIncomingState("pause");
            break;
          default:
            console.log("try again")
            console.log(event);
            break;
        }
    });
    setSocket(newSocket);
  }, []);

  useEffect(() => {
    if (player !== null) {
      switch(incomingState) {
        case "play":
          player.target.playVideo();
          break;
        case "pause":
          player.target.pauseVideo();
          break;
        default:
          console.log("unexpected behavior");
          break;
      }
    }

  }, [player, incomingState])

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Home setUsername={setUsername} username={username} setRoomCode={setRoomCode} roomCode={roomCode} socket={socket} />}/>
        <Route path='/:roomid' element={
          <Room 
            username={username} 
            socket={socket} 
            player={player} 
            setPlayer={setPlayer} 
            videoState={videoState} 
            setVideoState={setVideoState}
          />
        }/>
      </Routes>
    </div>
  );
}

export default App;
