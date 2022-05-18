import YoutubeEmbed from '../../components/Room/YouTubeEmbed/YouTubeEmbed';
import './Room.css'

const Room = () => {

    const TEST_ID = "OqIucWIdr24";
    return (
        <>
            <h1>Room</h1>
            <YoutubeEmbed embedId={TEST_ID} />
        </>
    )
}

export default Room;