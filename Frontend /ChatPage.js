import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { getMessages, sendMessage } from '../services/chat';

const socket = io('http://localhost:5000');

function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        async function fetchMessages() {
            const messages = await getMessages();
            setMessages(messages);
        }

        fetchMessages();

        return () => {
            socket.off('message');
        };
    }, []);

    const handleSendMessage = async () => {
        const message = { content: newMessage };
        await sendMessage(message);
        socket.emit('message', message);
        setNewMessage('');
    };

    return (
        <div>
            <h1>Chat</h1>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message.content}</div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default ChatPage;
