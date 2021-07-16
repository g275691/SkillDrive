import React, { useEffect, useState } from 'react';
import logo from '../../../Assets/img/logo.svg';
import HeaderMobile from '../HeaderMobile/HeaderMobile';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { Link } from 'react-router-dom';
import Login from '../../../Containers/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../../Store/Login/actions';

export const Header = ({ 
    isMain, loginIsClose, closeLogin,
messages }) => {
    
    const open = () => {
        closeLogin(false);
        document.querySelector(".mobile__wrapper").classList.toggle("is-active");
    }
    const isAuth = useSelector(state => state.login.isAuth);
    const messagesHistory = useSelector(state => state.Messages.users);
    const dispatch = useDispatch();

    const [messageSignalOnline, setMessageSignalOnline] = useState(false);
    const [messageSignalHistory, setMessageSignalHistory] = useState(false);

    useEffect(()=> {
        messagesHistory.map(el => {
            if(el.isRead == false) {
                setMessageSignalHistory(true);
                console.log(el)
            }
        })
        
        messages.map(el => {
            if(el.isRead == false && el.toUser == localStorage.getItem("userMail")) {
                setMessageSignalOnline(true);
                console.log(el)
            } else {
                setMessageSignalOnline(false);
            }
        })

    }, [messagesHistory, messages])

    return (
    <>
        <header>
            <Login />
            <nav className ={isMain ? "is-main" : ""}>
                <div className="navbar__container">
                    <Link to="/" rel="nofollow">
                        <img src={ logo } className="navbar__brand-text" alt="logo" />
                    </Link>
                    <div className="navbar__menu is-desktop">
                            <Link to={isAuth ? "/rent-page" : "/about"} className="navbar__menu-item is-animated" rel="nofollow">{isAuth ? "Бронирования" : "О нас"}</Link>
                            <Link to={isAuth ? "/my-cars" : ""} className="navbar__menu-item is-animated" rel="nofollow">{isAuth ? "Мои автомобили" : "Условия"}</Link>
                            <Link to={isAuth ? "/messages" : "/questions"} className="navbar__menu-item is-animated" rel="nofollow">
                                {isAuth ? "Сообщения" : "Частые вопросы"}
                                {messageSignalOnline ||  messageSignalHistory ? <div>●</div> : ""}
                            </Link>
                            {isAuth 
                            ? <img className="navbar__menu-avatar" 
                            src={`http://localhost:8000/img-car/${localStorage.getItem("userMail")}/avatar/avatar.jpg`} 
                            href="" target="_blank" rel="nofollow">

                            </img> 
                            : <div className="navbar__menu-login is-animated" href="" target="_blank" rel="nofollow" onClick={open}>Войти</div>}
                    </div>
                </div>
            </nav>
            <HeaderMobile onClick={open}/>
            <BurgerMenu loginIsClose={loginIsClose}/> 
        </header>
    </>
    )
};

export default Header;

