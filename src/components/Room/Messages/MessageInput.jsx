import { useState } from "react";
import './messages.css';

const MessageInput = ({
    username
}) => {
    const [messageText, setMessageText] = useState("");

    const sendMessage = () => {
        // sends username and messageText
    }
    return (
        <div className="message-input">
            <input type={"text"} onChange={e => setMessageText(e.target.value)} className='text-input'/>
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default MessageInput;