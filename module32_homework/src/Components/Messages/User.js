import React, {useEffect, useRef, useState} from 'react';

const User = ({
    user, setChat, 
    getChat, setMessages
}) => {
    const userImg = `http://localhost:8000/img-car/${user.mail}/avatar/avatar.jpg`
    const setFormatName = (name) => {
        return name.slice(0, name.indexOf(" "))
        + " "
        + name.slice(name.lastIndexOf(" "))[1] 
        + "."
    }

    return (<>
        <div className="user__container" 
        onClick={()=>{
            setChat(true);
            getChat(user.mail);
        }}>
            <div className="user__container-avatar"
            style={{background: `url(${userImg})`, backgroundSize: "cover"}}>
            </div>
            <div className="user__container-name">{setFormatName(user.name)}
                <span className="user__container-read">●</span>
                <p>Hyundai Solaris, 2018</p>
            </div>
            
            
            <div className="user__container-date">12.05.2020</div>
        </div>
    </>)
}

export default User;