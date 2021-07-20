import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmojiItem from './EmojiItem';
import { emojiList } from './emojiList';
import EmojiMenuItem from './EmojiMenuItem';
import io from "socket.io-client";

const Message = ({
    payload, toUser, sendEmoji
    
}) => {

    useEffect(()=> {
        let newMessage = [];
        // socket && socket.on('emojiToClient', (message) => {

        // });
    },[])

    useEffect(()=>{

    })

    // const sendEmoji = (emoji) => {
    //     socket && socket.emit('emojiToServer', 
    //     {
    //         time: Date.now(),
    //         messageTime: payload.time,
    //         emoji,
    //         fromUser: payload.fromUser,
    //         toUser: payload.toUser
    //     });
    // }

    const time = `${new Date(payload.time).getHours()}:${new Date(payload.time).getMinutes()}`
    const isOwner = payload.fromUser == localStorage.getItem("userMail");

    const [emojiMenu, setEmojiMenu] = useState(false);
    const [emojiMessage, setEmojiMessage] = useState([]);

    return (<>
    <div className={isOwner ? "message__container" : "message__container not-owner"}>
        {!isOwner ? <div className="message__container-avatar" 
        style={{backgroundImage: `url(http://localhost:8000/img-car/${toUser}/avatar/avatar.jpg)`, backgroundSize: "cover"}}>
        </div> : ""}
        <div className={isOwner 
            ? "message__container-text" 
            : "message__container-text not-owner"}>
            {payload.message}
            <div className="under__message">
                    <div className={emojiMenu ? "under__message-menu active" : "under__message-menu"}>
                        {emojiList.map(el=>{
                            return <EmojiMenuItem emoji={el} setEmojiMenu={setEmojiMenu}                             
                            sendEmoji={sendEmoji} payload={payload}
                            />
                        })}
                    </div>
                    {!emojiMenu ? <div className="under__message-start"
                    onClick={()=>setEmojiMenu(true)}>➥
                    </div> : "⠀"}
                    {!emojiMenu ? <div className="under__message-emoji">
                        {payload.emoji && payload.emoji.map((el,i)=>{
                            //if(el.messageTime == payload.time) {
                                return <EmojiItem key={i} emoji={el} />
                            //}
                        })}
                    </div> : ""}
                    {!emojiMenu? <div className="under__message-time">{time}</div> : ""}
            </div>
        </div>
    </div>
</>)
}

export default Message;