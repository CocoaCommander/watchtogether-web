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
    }
    return (
        <div className="message-input">
            <input type={"text"} onChange={e => setMessageText(e.target.value)} className='text-input'/>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default MessageInput;