import './Home.css'
const Home = ({
    setUsername,
    username,
    setRoomCode
}) => {

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handleRoomCodeChange = e => {
        setRoomCode(e.target.value);
    }

    return (
        <div className="home">
            <h1>Home</h1>
            <label htmlFor='username'>Enter a username:</label>
            <input type={"text"} onChange={handleUsernameChange} id={"username"}/>
            <button disabled={username === ""}>Create Room</button>
            <label htmlFor='room-code'>Join a room:</label>
            <input type={"text"} disabled={username === ""} id={"room-code"} placeholder={"Enter your room code"} onChange={handleRoomCodeChange}/>
        </div>
    )
}

export default Home;