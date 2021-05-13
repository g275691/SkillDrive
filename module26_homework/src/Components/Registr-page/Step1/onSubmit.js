import React from 'react';
import { Link } from 'react-router-dom';

export const OnSubmit = ({ name, mail, password, birthday, phone, 
    passport, passportDate, passportOrgan, passportCode,
    driver, driverDate, setErrMail, setWarning, 
    regButtonActive, setRedirect, redirect, buttonLoad, setButtonLoad, isValid }) => {
    
    const getRegistration = () => {
        setButtonLoad(true);
        if (!isValid) {
            setWarning("Данные введены некорректно");
            setButtonLoad(false);
            setTimeout(() => { setWarning(''); }, 3000);
        } else {
        let data = { name, mail, password, birthday, phone,
            passport, passportDate, passportOrgan, passportCode,
            driver, driverDate };
    
    fetch("http://localhost:8000/users/registration/step1", {
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify(data) })
    .then(response => {
        setButtonLoad(false);
        console.log(response);
        setTimeout(() => {
            setWarning(false);     
        }, 2000);
        if(response.status == 400) { 
            setWarning("Server: Данные введены некорректно");
            return response.text()
            .then(text => console.log(text))
        }
        else if(response.status == 401) { 
            setWarning("Такой почтовый ящик уже зарегистрирован");
            setErrMail("Почта уже зарегистрирована"); }
        else if(response.status == 200) { 
            setRedirect(true);
            return response.json()
            .then(response => {
                localStorage.setItem("accessToken", response.accessToken);
                localStorage.setItem("refreshToken", response.refreshToken);
            })
    } })
    .catch(err => {
        setButtonLoad(false);
        console.log(err);
        setTimeout(() => {
            setWarning(false);
        }, 2000);
        if(err.message == "Failed to fetch") { setWarning("Не удалось продолжить регистрацию. Попробуйте ещё раз") }
    } );
    }
    }
    return (
        <Link to="/success" class="button-wrapper" rel="nofollow" onClick={e=>{if(!redirect) {e.preventDefault()} }}>
        <button className={regButtonActive ? "" : "is-disable"} type="submit"
        onClick={() => { getRegistration(); }}>
        {buttonLoad ? " " : "Продолжить"}
        </button>
        <div class="cssload-container">
            <div class={buttonLoad ? "cssload-zenith animate" : "cssload-zenith"}></div>
        </div>
        </Link>
    )
}
