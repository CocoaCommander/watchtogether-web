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
  const [messages, setMessages] = useState([]);
  const [incomingTime, setIncomingTime] = useState(0);

  const navigate = useNavigate();
  const addMessage = (newMessage) => setMessages(state => [...state, newMessage]);

  useEffect(() => {
    let newSocket = new WebSocket(`ws://localhost:3001/sockets/video`);
    newSocket.addEventListener('message', function (event) {
        console.log('Message from server ', event.data);
        event = JSON.parse(event.data);

        switch(event.action) {
          case "success":
            console.log(event);
            setMessages(event.messageHistory);
            navigate(`/${event.sessionId}`, {state: event.videoUrl});
            break;
          case "play":
            console.log(`video is playing`);
            setIncomingTime(event.time);
            setIncomingState("play");
            break;
          case "pause":
            console.log(`video is paused`);
            setIncomingState("pause");
            break;
          case "message":
            console.log(`message received`);
            addMessage({username: event.body.username, message: event.body.message});
            break;
          case "close":
            console.log('somebody has left the room');
            addMessage({username: "", message: event.message});
            break;
          default:
            console.log("try again")
            console.log(event);
            break;
        }
    });
    setSocket(newSocket);
  }, [navigate, messages]);

  useEffect(() => {
    if (player !== null) {
      switch(incomingState) {
        case "play":
          player.target.playVideo()
          break;
        case "pause":
          player.target.pauseVideo();
          break;
        default:
          console.log("unexpected behavior");
          break;
      }
    }

  }, [player, incomingState, incomingTime]);

  useEffect(() => {
    console.log(messages);
  }, [messages])

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
            messages={messages}
          />
        }/>
      </Routes>
    </div>
  );
}

export default App;
