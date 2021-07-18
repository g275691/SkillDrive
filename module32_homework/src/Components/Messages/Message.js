import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmojiItem from './EmojiItem';
import { emojiList } from './emojiList';
import EmojiMenuItem from './EmojiMenuItem';
import io from "socket.io-client";

const Message = ({
    payload, toUser, fromUser,
    
}) => {

    const socket = io('http://localhost:5000', 
    { transports: ['websocket'] });

    useEffect(()=> {
        const newMessage = [];
        socket && socket.on('emojiToClient', (message) => {
            newMessage.push(message);
            setEmojiMessage([...newMessage]);
        });
    },[])

    const sendEmoji = (emoji) => {
        socket && socket.emit('emojiToServer', 
        {
            time: Date.now(),
            messageTime: payload.time,
            emoji,
            fromUser: payload.fromUser,
            toUser: payload.toUser
        });
    }

    const time = `${new Date(payload.time).getHours()}:${new Date(payload.time).getMinutes()}`
    const isOwner = payload.fromUser == localStorage.getItem("userMail");

    const [emojiMenu, setEmojiMenu] = useState(false);
    const [emojiMessage, setEmojiMessage] = useState([]);
    const [start, setStart] = useState(false);

    return (<>
    <div className={isOwner ? "message__container" : "message__container not-owner"}

    >
        
        {!isOwner ? <div className="message__container-avatar" 
        style={{backgroundImage: `url(http://localhost:8000/img-car/${toUser}/avatar/avatar.jpg)`, backgroundSize: "cover"}}>
        </div> : ""}
        <div className={isOwner 
            ? "message__container-text" 
            : "message__container-text not-owner"}>
            {payload.message}
            <div className="under__message">
                    <div className={emojiMenu ? "under__message-menu active" : "under__message-menu"}
                    onBlur={()=>setEmojiMenu(false)}>
                        {emojiList.map(el=>{
                            return <EmojiMenuItem emoji={el} setEmojiMenu={setEmojiMenu} 
                            emojiMessage={emojiMessage} setEmojiMessage={setEmojiMessage} sendEmoji={sendEmoji}
                            socket={socket}/>
                        })}
                    </div>
                    {!emojiMenu ? <div className="under__message-start"
                    onClick={()=>setEmojiMenu(true)}>➥
                    </div> : "⠀"}
                        {!emojiMenu? <div className="under__message-emoji">
                        {emojiMessage.map((el,i)=>{
                            if(el.messageTime == payload.time) {
                                return <EmojiItem key={i} emoji={el.emoji} />
                            }
                            
                        })}
                    </div> : ""}
                    {!emojiMenu? <div className="under__message-time">{time}</div> : ""}
            </div>
        </div>
    </div>
</>)
}

export default Message;