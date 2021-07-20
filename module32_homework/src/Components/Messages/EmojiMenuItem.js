import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EmojiMenuItem = ({
    emoji, setEmojiMenu, 
    sendEmoji, payload
}) => {

    return (<>
        <div className="emoji-item" 
        onClick={()=>{
            setEmojiMenu(false);
            console.log(emoji)
            sendEmoji(
                {
                    time: Date.now(),
                    messageTime: payload.time,
                    emoji,
                    fromUser: payload.fromUser,
                    toUser: payload.toUser
                });
        }}>
            {emoji}
        </div>
    </>)
}

export default EmojiMenuItem;