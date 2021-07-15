import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Global/Header/Header';
import io from "socket.io-client";
import Message from './Message';
import User from './User';
import { month as monthName} from '../Global/Datepicker/Month';
import imgSendMessage from '../../Assets/img/Messages/imgSendMessage.svg';
import imgSendDoc from '../../Assets/img/Messages/imgSendDoc.svg';

export const Messages = ({
    getUsers, users, getChatHistory, chatHistory,
    toUser, toUserName, fromUser
}) => {

    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState(
        [
 
        ]
    );

    const getDate = (date) => {
        let day = new Date(date).getDate(),
        monthNumber = new Date(date).getMonth(),
        month = monthName[monthNumber].toLowerCase(),
        year = new Date(date).getFullYear();
        
        /[йь]/.test(month)
        ? month = month.replaceAll(/[йь]/g, "я") 
        : month = month + "а";

        return `${(day + "").length == 2 ? day : "0" + day} ${month} ${year}`;
    }

    const [isChat, setChat] = useState(false);
    const socket = io('http://localhost:5000', 
    { transports: ['websocket'] });

    useEffect(()=> {
        const newMessage = [];
        socket.on('msgToClient', (message) => {
            newMessage.push(message);
            setMessages([...newMessage]);
        });
        getUsers();

        socket.on("connect", () => {
            console.log("test"); // "G5p5..."
          });
    },[]);

    const sendMessage = () => {
        socket.emit('msgToServer', 
        {
            time: Date.now(),
            fromUser: fromUser,
            toUser: toUser,
            message: inputValue,
            isRead: false,
        }
        );
        setInputValue("");
    }
    
    useEffect(()=>{

    })

    if((!isChat && !users) 
    || (isChat && !chatHistory)) 
    return (<div><Header /></div>)
    return (<>
        <Header />
        <div className="messages__container">
            {!isChat 
            ? <><h2>Сообщения</h2> 
            <div className="wrapper">
            {users.filter(el=>el.mail != localStorage.getItem("userMail"))
                .map((el,i) => {
                return <User key={i} user={el} setChat={setChat} getChatHistory={getChatHistory} messages={messages} />
            })}
            </div>
            </>
            : "" }
            
            {isChat 
            ? <>
            <div className="back-page-arrow" 
                onClick={()=> {setChat(false)}}>
                <span className="icon-back"></span>
                <span>Назад</span>
            </div>
            <div className="messages__container-name">{toUserName}</div>
            <div className="messages__container-area">
                
                {chatHistory
                .map((el,i)=>{
                    let date = new Date(el.time).getDate(),
                    prevDate = chatHistory[i-1] && new Date(chatHistory[i-1].time).getDate();

                    return (<>
                    {prevDate != date && (<div className="messages__container-date" key={el._id}>{getDate(el.time)}</div>)}    
                    
                    <Message key={i} payload={el} chatHistory={chatHistory} setMessages={setMessages}
                    toUser={toUser} /> 
                    </>)
                })}
                {messages
                .map((el, i)=>{
                    if((el.toUser == toUser && el.fromUser == fromUser)
                    || (el.toUser == fromUser && el.fromUser == toUser)) {
                        
                        let date = new Date(el.time).getDate(),
                        prevDate = messages[i-1] && new Date(messages[i-1].time).getDate();

                        return (<>
                            {prevDate != date && 
                            (<div className="messages__container-date">
                                {getDate(el.time)}
                            </div>)}
                            <Message key={i} payload={el} chatHistory={chatHistory} setMessages={setMessages}
                            toUser={toUser} fromUser={fromUser}/>
                        </>)
                }
                })
                }
            </div>
            <div className="messages__container-input">
                <img src={imgSendDoc} />
                <input type="text" value={inputValue} placeholder="Начните вводить текст"
                onChange={e=>{ setInputValue(e.target.value); }}
                onKeyDown={event=>{
                if(event.key === "Enter" 
                && inputValue != "") { sendMessage(); } }}>
                </input>
                <img src={imgSendMessage} 
                onClick={()=> {
                    inputValue != "" && sendMessage()
                }}/>
            </div>
            </> 
            : ""}

        </div>
        
    </>)
}
