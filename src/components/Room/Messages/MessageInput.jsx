import { useState } from "react";
import './messages.css';

const MessageInput = ({
    username,
    socket,
    id
}) => {
    const [messageText, setMessageText] = useState("");

    const sendMessage = () => {
        socket.send(JSON.stringify({
            action: `message`,
            body: {
                id: id,
                username: username,
                message: messageText
            }
        }))
        setMessageText(""); 
    }

    const handleEnter = e => {
        if (e.key === `Enter`) {
            sendMessage()
        }
    }
    return (
        <div className="message-input">
            <input type={"text"} onKeyDown={handleEnter} onChange={e => setMessageText(e.target.value)} className='text-input' value={messageText}/>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default MessageInput;