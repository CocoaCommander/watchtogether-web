import { useEffect, useState } from "react";
import './messages.css';

const Message = ({
    name,
    messageText,
    myUsername
}) => {
    return (
        <div className="message-content">
            <div className="message-username">{name}</div>
            <p className={myUsername === name ? "message-text-blue" : "message-text"}>{messageText}</p>
        </div>
    )
}

const MessageList = ({
    messages,
    username
}) => {

    return (
        <div className="messages-list">
            {messages.map(msg => <Message name={msg.username} messageText={msg.message} myUsername={username}/>)}
        </div>
    )
}

export default MessageList;