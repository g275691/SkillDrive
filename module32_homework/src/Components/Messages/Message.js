import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Message = ({
    payload, toUser, fromUser
}) => {

    useEffect(()=> {
        
    })

    const time = `${new Date(payload.time).getHours()}:${new Date(payload.time).getMinutes()}`
    const isOwner = payload.fromUser == localStorage.getItem("userMail");

    return (<>
    <div className={isOwner ? "message__container" : "message__container not-owner"}>
        
        {!isOwner ? <div className="message__container-avatar"
        style={{backgroundImage: `url(http://localhost:8000/img-car/${toUser}/avatar/avatar.jpg)`, backgroundSize: "cover"}}>
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