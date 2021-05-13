import React, { useState } from 'react';
import logo from '../../../img/logo.svg';
import HeaderMobile from '../HeaderMobile/HeaderMobile';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import { Link } from 'react-router-dom';
import Login from '../../../Containers/Login/Login';
import {checkToken} from '../CallApi/chectToken';
import "regenerator-runtime/runtime.js"; 

export const Header = ({ isMain, loginIsClose, closeLogin }) => {
    
    const open = () => {
        closeLogin(false);
        document.querySelector(".mobile__wrapper").classList.toggle("is-active");
    }

    return (
    <>
        <header>
            <Login />
            <nav className ={isMain ? "is-main" : ""}>
                <div className="navbar__container">
                    <Link to="/" rel="nofollow">
                        <img src={ logo } className="navbar__brand-text" alt="logo"/>
                    </Link>
                    <div className="navbar__menu is-desktop">
                            <Link to="/about" className="navbar__menu-item is-animated" rel="nofollow">О нас</Link>
                            <div className="navbar__menu-item is-animated" rel="nofollow">Условия</div>
                            <Link to="/questions" className="navbar__menu-item is-animated" rel="nofollow">Частые вопросы</Link>
                            <div className="navbar__menu-login is-animated" href="" target="_blank" rel="nofollow" onClick={open}>Войти</div>
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

