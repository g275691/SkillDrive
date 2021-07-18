import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const EmojiMenuItem = ({
    emoji, setEmojiMenu, 
    emojiMessage, setEmojiMessage,
    sendEmoji, socket
}) => {

    return (<>
        <div className="emoji-item" 
        onClick={()=>{
            setEmojiMenu(false);
            sendEmoji(emoji);
        }}>
            {emoji}
        </div>
    </>)
}

export default EmojiMenuItem;