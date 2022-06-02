import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import MessageInput from '../../components/Room/Messages/MessageInput';
import MessageList from '../../components/Room/Messages/MessageList';
import './Room.css'

const Room = ({
    username,
    socket,
    player,
    setPlayer,
    videoState,
    setVideoState,
    messages
}) => {

    const [videoUrl, setVideoUrl] = useState("");
    const [title, setTitle] = useState("Loading...")

    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        setVideoUrl(location.state);
    }, [location]);

    const waitForOpenConnection = (socket) => {
        return new Promise((resolve, reject) => {
            const maxNumberOfAttempts = 10
            const intervalTime = 200 //ms
    
            let currentAttempt = 0
            const interval = setInterval(() => {
                if (currentAttempt > maxNumberOfAttempts - 1) {
                    clearInterval(interval)
                    reject(new Error('Maximum number of attempts exceeded'))
                } else if (socket.readyState === socket.OPEN) {
                    clearInterval(interval)
                    resolve()
                }
                currentAttempt++
            }, intervalTime)
        })
    }
    
    const sendMessage = async (socket, msg) => {
        if (socket.readyState !== socket.OPEN) {
            try {
                await waitForOpenConnection(socket)
                socket.send(msg)
            } catch (err) { console.error(err) }
        } else {
            socket.send(msg)
        }
    }

    
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
                sendMessage(socket, JSON.stringify({
                    action: `play`,
                    body: {
                        username: username,
                        id: params.roomid,
                        time: player.target.getCurrentTime()
                    }
                }))
                break;
            case 2:
                console.log(`paused`);
                sendMessage(socket, JSON.stringify({
                    action: `pause`,
                    body: {
                        username: username,
                        id: params.roomid
                    }
                }))
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
        setPlayer(e);
        setTitle(e.target.getVideoData().title);
    }

    return (
        <>
            <h1>{title}</h1>
            <div className='subheader'>
                <h2>{`Join with ${params.roomid}`}</h2><button onClick={() => {navigator.clipboard.writeText(params.roomid)}}>Copy To Clipboard</button>
            </div>
            <div className='video-chat-container'>
            <YouTube videoId={videoUrl} onStateChange={e => setVideoState(e.data)} onReady={registerVideo}/>
                <div className='messages-box'>
                    <MessageList messages={messages} username={username}/>
                    <MessageInput username={username} socket={socket} id={params.roomid}/>
                </div>
            </div>
        </>
    )
}

export default Room;