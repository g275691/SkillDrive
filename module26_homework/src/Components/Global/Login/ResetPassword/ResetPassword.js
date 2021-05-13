import React, { useEffect, useState } from 'react';
import InputBlock from '../inputBlock/InputBlock';
import login from '../../../../img/login.svg';
import closeImg from '../../../../img/close.svg';
import { Link } from 'react-router-dom';
import { onResetPassword } from './onResetPassword';
import { Redirect } from 'react-router';

export const ResetPassword = ({mail, pass, repeatPass, setMail, setPass, setRepeatPass}) => {

    let [mailErr, setMailErr] = useState(undefined);
    let [passErr, setPassErr] = useState(undefined);
    let [repeatPassErr, setRepeatPassErr] = useState(undefined);
    let [serverErr, setServerErr] = useState(undefined);
    let [butActive, setButActive] = useState(false);
    let [validPassErr, setValidPassErr] = useState(false);

    let [resetPassSuccess, setResetPassSuccess] = useState(false);

    let validPass;
    useEffect(() => {
        validPass = pass == repeatPass;
        mailErr=="" && passErr=="" && repeatPassErr=="" ? setButActive(true) : setButActive(false)
    })

    if(resetPassSuccess) return ( <Redirect to="/" /> )

    return (
        <>
        <div className="reset-container">
            <form className="reset-form">
            <Link to="/">
            <img src={closeImg} className="close"/>
            </Link>
                    <img src={login} />
                    <h2>Форма для восстановления пароля</h2>
                    <span className={serverErr || mailErr || passErr ? "is-valid" : ""}>{
                    serverErr ? serverErr : validPassErr ? "Пароли не совпадают" : "Неправильная почта или пароль"}</span>

                        < InputBlock type="text" mail text="Введите почту" value={mail} 
                        isValid={mailErr} setValid={setMailErr} setState={setMail}/>
                        < InputBlock type="password" text="Введите новый пароль" value={pass} 
                        isValid={passErr} setValid={setPassErr} setState={setPass}/>
                        < InputBlock type="password" text="Повторите новый пароль" value={repeatPass} 
                        isValid={repeatPassErr} setValid={setRepeatPassErr} setState={setRepeatPass}/>

                    <button className={!butActive ? "is-disable" : ""} onClick={
                        e => {e.preventDefault(); 
                            onResetPassword(validPass, setValidPassErr, setPassErr, setRepeatPassErr, 
                            setResetPassSuccess, setServerErr, setMailErr, mail, pass)}
                    }>Сбросить пароль</button>
            </form>
        </div>
        </>
    )
}