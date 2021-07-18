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
            // {
            //     fromUser: "test0@yandex.ru",
            //     isRead: false,
            //     message: "Вы хотели бы арендовать машину, абсолютно верно, не так ли, да?",
            //     time: 1626411775560,
            //     toUser: "test1@yandex.ru"
            // },
            // {
            //     fromUser: "test1@yandex.ru",
            //     isRead: false,
            //     message: "Вы хотели бы арендовать машину, абсолютно верно, не так ли, да?",
            //     time: 1626499735560,
            //     toUser: "test0@yandex.ru"
            // },
            // {
            //     fromUser: "test0@yandex.ru",
            //     isRead: false,
            //     message: "Зачем вы меня передразниваете?",
            //     time: 1626499275560,
            //     toUser: "test1@yandex.ru"
            // },
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
            document.querySelector(".messages__container-area").scrollTop = 1900;
        });
        getUsers();
        
    },[]);

    const sendMessage = () => {
        socket.emit('msgToServer', 
        {
            time: Date.now(),
            fromUser: fromUser,
            toUser: toUser,
            message: inputValue,
            isRead: false,
        });
        setInputValue("");
    }

    useEffect(()=>{
        console.log(messages)
    }, [messages])

    if((!isChat && !users) 
    || (isChat && !chatHistory)) 
    return (<div><Header /></div>)
    return (<>
        <Header messages={messages}/>
        <div className="messages__container">
            {!isChat 
            ? <><h2>Сообщения</h2> 
            <div className="wrapper">
            {
            users.map((el,i) => {
                return <User key={i} user={el} setChat={setChat} 
                getChatHistory={getChatHistory} chatHistory={chatHistory}
                messages={messages} setMessages={setMessages}
                toUser={toUser}
                />
            })
            }
            </div>
            </>
            : "" }
            
            {isChat 
            ? <>
            <div className="back-page-arrow" 
                onClick={()=> {
                    setChat(false);
                    getUsers()
                    }}>
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
                            toUser={toUser} fromUser={fromUser}
                            socket={socket}
                            />
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
