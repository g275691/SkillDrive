import React, {useEffect, useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmojiItem from './EmojiItem';
import { emojiList } from './emojiList';
import EmojiMenuItem from './EmojiMenuItem';
import chatBot from '../../Assets/img/Messages/chatBot.svg';
import okRent from '../../Assets/img/Messages/okRent.svg';

const Message = ({
    payload, toUser, sendEmoji,
    updateMessage
}) => {

    const time = `${new Date(payload.time).getHours()}:${new Date(payload.time).getMinutes()}`;
    const isOwner = payload.fromUser == localStorage.getItem("userMail");
    const [rate, setRate] = useState(-1);
    const [emojiMenu, setEmojiMenu] = useState(false);
    let botText = "",
    botButtonText = false,
    updateData = {};
    switch (payload.chatBot) {
        case "rentStart":
            botText = "Аренда начата";
            break;
        case "rentEnd":
            botText = "Аренда завершена";
            break;
        case "setRentEnd":
            botText = "Вы начали аренду. Автомобиль необходимо вернуть по тому же адресу 8 июня";
            botButtonText = "Завершить аренду";
            break;
        case "setRezerv":
            botText = "Бронирование подтверждено";
            break;
        case "setRentOwner":
            botText = "Подтвердите, если одобряете заявку на бронирование";
            updateData = {
                messageTime: payload.time,
                statusStartTalkOwner: true 
            }
            botButtonText = "Забронировать";
            break;
        case "setRentClient":
            botText = "Подтвердите, когда начнёте аренду";
            botButtonText = "Начать аренду";
            break;
        case "map":
            botText = "Автомобиль будет вас ждать по адресу: Санкт-Петербург, ул. Невский пр-кт, 2";
            break;
        case "rate":
            botText = "Оцените аренду. Всё ли хорошо? Оставьте отзыв автомобилю и владельцу, и вы сможете увидеть отзыв о себе";
            botButtonText = "Написать отзыв";
            break;
        case "rateOk":
            botText = "Отзыв отправлен";
            break;
        default:
            break;
    }

    return (<>
    
    <div className={isOwner 
        ? "message__container"
        : "message__container not-owner"}
        style={{display: payload.chatBot && isOwner && "none"}}>
        {!isOwner ? <img className="message__container-avatar" 
        src={payload.chatBot ? chatBot : `http://localhost:8000/img-car/${toUser}/avatar/avatar.jpg`}

        >
        </img> : ""}
        <div className={isOwner 
            ? "message__container-text" 
            : "message__container-text not-owner"}>
            {payload.chatBot 
            ? <div className="message__container-text-bot">
                {!botButtonText ? <img src={okRent}></img> : ""}
                <span
                style={{color: !botButtonText && "#61A199",
                fontWeight: !botButtonText ? "500" : "normal"}}>{botText}</span>
            </div> : ""}

                {payload.chatBot == "rate" 
                ? <div className="message__container-text-rate">
                    {[0,1,2,3,4].map((el, i) => {
                        return <div className={i <= rate ? "rate-item select" : "rate-item"}
                        onClick={()=>{
                            setRate(el);
                        }}>★</div> 
                    })}
                </div> : ""}

            {botButtonText ? <div className="message__container-text-button">
                <span
                onClick={()=>{
                    updateMessage(updateData)
                }}>{botButtonText}</span></div> : ""}
            {payload.message}
                {!payload.chatBot ? <div className="under__message">
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
                    {!emojiMenu  ? <div className="under__message-emoji">
                        {payload.emoji && payload.emoji.map((el,i)=>{
                            return <EmojiItem key={i} emoji={el} />
                        })}
                    </div> : ""}
                    {!emojiMenu ? <div className="under__message-time">{time}</div> : ""}
            </div> : ""}
        </div>
    </div>
</>)
}

export default Message;