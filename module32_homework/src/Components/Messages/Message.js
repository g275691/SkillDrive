import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Message = ({
    payload
}) => {

    const chat = useSelector(state => state.Messages.chat);

    useEffect(()=>{
        console.log(payload)
    })

    const time = `${new Date(payload._id).getHours()}:${new Date(payload._id).getMinutes()}`
    const toUser = `http://localhost:8000/img-car/${chat[0].toUser}/avatar/avatar.jpg`;
    const isOwner = payload.fromUser == localStorage.getItem("userMail");
    
    return (<>
        <div className={isOwner ? "message__container" : "message__container not-owner"}>
            
            {!isOwner ? <div className="message__container-avatar"
            style={{backgroundImage: `url(${toUser})`, backgroundSize: "cover"}}>
            </div> : ""}
            <div className={isOwner 
                ? "message__container-text" 
                : "message__container-text not-owner"}>
                {payload.message}
                <div className="time">
                    {time}
                </div>
            </div>
        </div>
    </>)
}

export default Message;