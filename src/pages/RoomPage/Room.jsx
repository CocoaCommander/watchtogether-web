import { useEffect, useState } from 'react';
import YouTubeEmbed from '../../components/Room/YouTubeEmbed/YouTubeEmbed';
import './Room.css'

const Room = () => {

    const [isHost, setIsHost] = useState(false);
    const [socketURL, setSocketURL] = useState("");

    useEffect(() => {
        // get room code from url
        // get websocket url
        // see if current user is the host and set isHost
        // get list of users in room
    })

    const TEST_ID = "spN2_Tuw9hE";
    return (
        <>
            <h1>Room</h1>
            <YouTubeEmbed embedId={TEST_ID} />
        </>
    )
}

export default Room;