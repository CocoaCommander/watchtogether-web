import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import MessageInput from '../../components/Room/Messages/MessageInput';
import MessageList from '../../components/Room/Messages/MessageList';
import './Room.css'

const Room = ({
    username,
    socket,
    setPlayer,
    videoState,
    setVideoState
}) => {

    const [videoUrl, setVideoUrl] = useState("");

    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        setVideoUrl(location.state);
    }, [location]);

    
    useEffect(() => {
        switch(videoState) {
            case -1:
                console.log(`unstarted`);
                break;
            case 0:
                console.log(`ended`);
                break;
            case 1:
                console.log(`playing`);
                socket.send(JSON.stringify({
                    action: `play`,
                    body: {
                        username: username,
                        id: params.roomid
                    }
                }));
                break;
            case 2:
                console.log(`paused`);
                socket.send(JSON.stringify({
                    action: `pause`,
                    body: {
                        username: username,
                        id: params.roomid
                    }
                }));
                break;
            case 3:
                console.log(`buffering`);
                break;
            case 5:
                console.log(`video cued`);
                break;
            default:
                console.log(`uncaught number: ${videoState}`);
                break;
        }
    }, [videoState, params.roomid, socket, username]);

    const registerVideo = e => {
        console.log(e);
        setPlayer(e);
    }

    return (
        <>
            <h1>Room</h1>
            <div className='video-chat-container'>
            <YouTube videoId={videoUrl} onStateChange={e => setVideoState(e.data)} onReady={registerVideo}/>
                <div className='messages-box'>
                    <MessageList />
                    <MessageInput username={username} />
                </div>
                {/* <button onClick={pauseVideo}>Pause</button> */}
            </div>
        </>
    )
}

export default Room;