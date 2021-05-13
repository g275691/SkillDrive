import React from 'react';
import InputBlock from './inputBlock';

export const AllForms = ({mailLogin, passwordLogin, isFormForSend, isFormMailSent,
    errMailLogin, errPasswordLogin, errServerLogin, setLoginMail,
    setLoginPassword, setLoginErrMail, setLoginErrPassword, setFormForSend }) => {
        
    const changeForm = () => { isFormForSend ? setFormForSend(false) : setFormForSend(true); }
    return (
        <div className="form-wrapper">
            <h2>{isFormMailSent ? "Проверьте почту" : isFormForSend ? "Восстановление пароля" : "Авторизация"}</h2>
            <span className={errServerLogin || errMailLogin || errPasswordLogin ? "is-valid" : ""}>
                {errServerLogin ? errServerLogin : (isFormForSend ? "Неверная почта" : "Неверная почта или пароль")}
            </span>
            {isFormForSend || isFormMailSent ? <div className={isFormMailSent ? "modal__container-description mail-sent" : "modal__container-description"}>
                {isFormForSend ? "Мы отправим ссылку для восстановления пароля на вашу электронную почту" : 
                "Мы отправили письмо на вашу почту, пройдите по ссылке, которую мы отправили и измените пароль."}</div> : ""}
            <form>
                { isFormMailSent ? "" : isFormForSend ? 
                <InputBlock type="text" mail text="Электронная почта" value={mailLogin} setState={setLoginMail}
                isValid={errMailLogin} setValid={setLoginErrMail} 
                errServerLogin={errServerLogin=="Такая почта не зарегистрирована" ? errServerLogin : false}/> :
                <> <InputBlock type="text" mail text="Электронная почта" value={mailLogin} setState={setLoginMail}
                isValid={errMailLogin} setValid={setLoginErrMail} 
                errServerLogin={errServerLogin=="Такая почта не зарегистрирована" ? errServerLogin : false}/>
                <InputBlock type="password" text="Пароль" value={passwordLogin} setState={setLoginPassword}
                isValid={errPasswordLogin} setValid={setLoginErrPassword} 
                errServerLogin={errServerLogin=="Неправильный пароль" ? errServerLogin : false} 
                pass onClickForgetPass={changeForm}/>
                </> }
            </form>
        </div>
    )
}