import { useState } from 'react';
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
                username: username
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
            <h1>WatchTogether</h1>
            <h2>Let's watch something together!</h2>
            <div className='step-one'>
                <label htmlFor='username'>Enter a username:</label>
                <input type={"text"} onChange={handleUsernameChange} id={"username"}/>
            </div>
            <div className='step-two'>
                <div className='section'>
                    <UrlReader setVideoURL={setVideoURL} />
                    <button onClick={username === "" ? "" : createRoom}>Create Room</button>
                </div>
                <div className='divider'>OR</div>
                <div className='section'>
                    <label htmlFor='code'>Join a room:</label>
                    <input type={"text"} disabled={username === ""} id={"code"} placeholder={"Enter your room code"} onChange={handleRoomCodeChange}/>
                    <button disabled={username === "" && roomCode === ""} onClick={username === "" && roomCode === "" ? "" : joinRoom}>Enter Room</button>
                </div>
            </div>

        </div>
    )
}

export default Home;