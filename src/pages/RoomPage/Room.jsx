import YoutubeEmbed from '../../components/Room/YouTubeEmbed/YouTubeEmbed';
import './Room.css'

const Room = () => {

    const TEST_ID = "spN2_Tuw9hE";
    return (
        <>
            <h1>Room</h1>
            <YoutubeEmbed embedId={TEST_ID} />
        </>
    )
}

export default Room;