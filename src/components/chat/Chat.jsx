import React, { useState } from 'react'
import MessageUser from './messageUser/MessageUser';
import MessageBot from './messageBot/MessageBot';

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/api/chatbot/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                botName: 'PetBot',
                question: input,
            }),
        });

        const data = await response.json();

        setMessages([...messages, { role: 'user', pergunta: input }, { role: 'bot', resposta: data.answer }]);
        setInput('');
    };

    return (
        <>
            <div>
                {messages.map((message, index) => (
                    message.role ==='user' ? 
                    <MessageUser key={index} pergunta={message.pergunta} />: 
                    <MessageBot key={index} resposta={message.resposta} /> 
                ))}
            </div>
            <form onSubmit={handleSend}>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit">Send</button>
            </form>
        </>
    )
}

export default Chat