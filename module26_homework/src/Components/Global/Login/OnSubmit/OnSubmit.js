import React from 'react';
import {onPassRecovery} from './onPassRecovery';
import {onLogin} from './onLogin';

export const OnSubmit = ({mailLogin, passwordLogin, isFormForSend, isFormMailSent,
    buttonActiveLogin, buttonLoadLogin, setLoginErrServer, setFormForSend, setFormMailSent,
    setLoginButtonLoad, closeLogin}) => {

    return (
        <>
        {isFormMailSent ? "" : <div class="button-wrapper">
        <button className={buttonActiveLogin ? "is-disable" : ""}
    onClick={isFormForSend ? 
    ()=>{onPassRecovery(mailLogin, setLoginErrServer, setFormMailSent, setFormForSend, setLoginButtonLoad)} : 
    ()=>{onLogin(mailLogin, passwordLogin, setLoginErrServer, closeLogin, setLoginButtonLoad)}}>
        {buttonLoadLogin ? " " : isFormForSend ? "Отправить" : "Войти"}</button>
            <div class="cssload-container">
                <div class={buttonLoadLogin ? "cssload-zenith animate" : "cssload-zenith"}></div>
            </div>
                            </div>
        }
        </>
    )
}