import React, { useEffect, useState } from 'react'
import MessageUser from './messageUser/MessageUser';
import MessageBot from './messageBot/MessageBot';
import style from './Chat.module.scss'

const Chat = () => {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [allbots, setAllBots] = useState([]);
    const [bots, setBots] = useState([]);

    const fetchBots = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/chatbot/allbots');
            const data = await response.json();
            setAllBots(data.allChatbotsNames);
            setBots(data.allChatbotsNames[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSend = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/api/chatbot/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                botName: bots,
                question: input,
            }),
        });

        const data = await response.json();

        setMessages([...messages, { role: 'user', content: input }, { role: 'bot', content: data.answer }]);
        setInput('');

        const message = await fetch('http://localhost:3000/api/chatbot/saveMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                botName: bots,
                userMessage: input,
                botMessage: data.answer
            })
        });

    };

    const handleSelect = async (event) => {
        setBots(event.target.value);
    }

    const fetchMessages = async () => {
        try {
            if (bots && bots.length > 0) {
                const response = await fetch(`http://localhost:3000/api/chatbot/getMessages/${bots}`);
                const data = await response.json();
                setMessages(data.messages);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchBots();
    }, []);

    useEffect(() => {
        if (bots && bots.length > 0) {
            fetchMessages();
        }
    }, [bots]);

    console.log(messages)

    return (
        <>
        <div className={style['select-bot']}>
            <select onChange={(e) => handleSelect(e)}>
                {allbots.map((bot, index) => (
                    <option key={index} value={bot}>{bot}</option>
                )
                )}
            </select>
            </div>
            <div className={style['chat-content']}>
                {messages.map((message, index) => (
                    message.role === 'user' ?
                        <MessageUser key={index} pergunta={message.content} /> :
                        <MessageBot key={index} resposta={message.content} />
                ))}
            </div>
            <form className={style['form-message']} onSubmit={handleSend}>
                <input value={input} onChange={(e) => setInput(e.target.value)} />
                <button type="submit">Enviar</button>
            </form>

        </>
    )
}

export default Chat