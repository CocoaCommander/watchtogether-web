import { useEffect, useState } from "react";
import './messages.css';

const Message = ({
    username,
    messageText
}) => {
    return (
        <div className="message-content">
            <div className="message-username">{username}</div>
            <p className="message-text">{messageText}</p>
        </div>
    )
}

const MessageList = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const DUMMY_MESSAGES = [
            {username: `Mel`, messageText: `My name is Mel`},
            {username: `Foo`, messageText: `test test test test test test test test test test test test test test test test test test test test test test test test test test test`},
            {username: `Bar`, messageText: `🫠`}
        ];

        setMessages(DUMMY_MESSAGES);
    }, [])

    return (
        <>
            {messages.map(msg => <Message username={msg.username} messageText={msg.messageText} />)}
        </>
    )
}

export default MessageList;