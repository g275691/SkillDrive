import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Global/Header/Header';
import io from "socket.io-client";
import Message from './Message';
import User from './User';

export const Messages = ({
    getUsers, users, getChat, chat
}) => {

    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState([]);
    const [isChat, setChat] = useState(false);
    const socket = io('http://localhost:5000', 
    { transports: ['websocket'] });
    const [selectUser, setSelectUser] = useState(null);

    useEffect(()=> {
        const newMessage = [];
        socket.on('msgToClient', (message) => {
            //newMessage = chat.concat(newMessage)
            newMessage.push(message);
            setMessages([...newMessage]);
        });
        getUsers();
    },[]);

    useEffect(()=> {
        setMessages(chat);
    }, [chat])

    const sendMessage = () => {
        socket.emit('msgToServer', 
        {
            id: Date.now(),
            fromUser: localStorage.getItem("userMail"),
            toUser: chat[0].toUser,
            message: inputValue,
            isRead: false
        }
        );
        setInputValue("");
    }
    if((!isChat && !users) 
    || (isChat && !chat)) 
    return (<div><Header /></div>)
    return (<>
        <Header />
        <div className="messages__container">
            {!isChat 
            ? <><h2>Сообщения</h2> 
            <div className="wrapper">
            {users.filter(el=>el.mail != localStorage.getItem("userMail"))
                .map((el,i) => {
                return <User key={i} user={el} setChat={setChat} getChat={getChat} />
            })}
            </div>
            </>
            : "" }
            
            {isChat 
            ? <>
            <div className="messages__container-area">
                {messages.map((el, i)=>(
                <Message key={i} payload={el} chat={chat} setMessages={setMessages}/>
                ))}
            </div>
            <input value={inputValue} placeholder="Начните вводить текст"
            onChange={e=>{ setInputValue(e.target.value); }}
            onKeyDown={event=>{
            if(event.key === "Enter") { sendMessage(); } }}>
            
            </input>
            </> 
            : ""}

        </div>
        
    </>)
}
