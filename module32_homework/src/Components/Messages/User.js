import React, {useEffect, useRef, useState} from 'react';

const User = ({
    user, setChat, 
    getChatHistory, chatMessage
}) => {
    const userImg = `http://localhost:8000/img-car/${user.mail}/avatar/avatar.jpg`
    const setFormatName = (name) => {
        return name.slice(0, name.indexOf(" "))
        + " "
        + name.slice(name.lastIndexOf(" "))[1] 
        + "."
    }

    const [isReadOnline, setReadOnline] = useState(true);
    const [lastMessage, setLastMessage] = useState([]);

    const formatDate = (date) => {
        if(date) return `${new Date(date).getDate()}.${new Date(date).getMonth()}.${new Date(date).getFullYear()}`;
    }

    useEffect(()=> {
        chatMessage.forEach(el=>{
            
            if(el.fromUser == user.mail && el.toUser == localStorage.getItem("userMail")) {
                setLastMessage(el);
                if(!el.isRead) {
                    setReadOnline(false);
                } else {
                    setReadOnline(true);
                }
            }
        })
    }, [chatMessage])

    useEffect(()=>{
        user.lastTrip && console.log(user.lastTrip.car)
    })

    return (<>
        <div className="user__container" 
        onClick={()=>{

            setChat(true);
            getChatHistory(user.mail, setFormatName(user.name));
            setReadOnline(true);

            // let onlineMessages = [...messages];
            
            // onlineMessages.forEach(el=>{
            //     if(el.fromUser == user.mail) {
            //         el["isRead"] = true;
            //     }
            // })

            // setMessages(onlineMessages);
        }}
        >
            <div className="user__container-avatar"
            style={{background: `url(${userImg})`, backgroundSize: "cover"}}>
            </div>
            <div className="user__container-name">{setFormatName(user.name)}
                {!user.isRead || !isReadOnline ? <span className="user__container-read">●</span> : ""}
                <p>{user.lastTrip && user.lastTrip.car 
                ? `${user.lastTrip.car.brand} ${user.lastTrip.car.model}, ${user.lastTrip.car.year}` 
                : ""}</p>
            </div>
            
            
            <div className="user__container-date">
                {formatDate(lastMessage.time)}
            </div>
        </div>
    </>)
}

export default User;