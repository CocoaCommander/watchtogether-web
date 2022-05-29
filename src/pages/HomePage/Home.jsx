import { useEffect, useState } from 'react';
import './Home.css'
const UrlReader = ({
    setVideoURL
}) => {
    const handleURL = url => {
        url = url.split("v=")[1].split("&")[0];
        setVideoURL(url);
    }

    return (
        <div className='url-reader-container'>
            <label htmlFor='url-reader'>Paste YouTube Link Here:</label>
            <input id='url-reader' onChange={(e) => handleURL(e.target.value)} />
        </div>
    )
}

const Home = ({
    setUsername,
    username,
    setRoomCode,
    roomCode,
    socket
}) => {
    const [videoURL, setVideoURL] = useState("");

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handleRoomCodeChange = e => {
        setRoomCode(e.target.value);
    }

    const joinRoom = () => {
        socket.send(JSON.stringify({
            action: 'join',
            body: {
                id: roomCode,
                username, username
            }
        }));
    }

    const createRoom = () => {
        socket.send(JSON.stringify({
            action: 'create',
            body: {
                videoUrl: videoURL,
                username: username
            }
        }));
    }

    return (
        <div className="home">
            <h1>Home</h1>
            <label htmlFor='username'>Enter a username:</label>
            <input type={"text"} onChange={handleUsernameChange} id={"username"}/>
            <UrlReader setVideoURL={setVideoURL} />
            <button disabled={username === ""} onClick={createRoom}>Create Room</button>
            <label htmlFor='room-code'>Join a room:</label>
            <input type={"text"} disabled={username === ""} id={"room-code"} placeholder={"Enter your room code"} onChange={handleRoomCodeChange}/>
            <button disabled={username === "" && roomCode === ""} onClick={joinRoom}>Enter Room</button>
        </div>
    )
}

export default Home;