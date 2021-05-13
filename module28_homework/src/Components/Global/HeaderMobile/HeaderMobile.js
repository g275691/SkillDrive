import React from 'react';
import logoMobile from '../../../Assets/img/logo.svg';
import { Link } from 'react-router-dom';

const HeaderMobile = ({onClick}) => {

    return (
    <div className="mobile__wrapper is-mobile is-animated is-active">
        <Link to="/" rel="nofollow">
            <img src={ logoMobile } className="navbar__brand-mobil" alt="logo" />
        </Link>
        <div className="menu__mobile-container">
            <nav className="menu__mobile">
                <Link to="/about" className="menu__mobile-link is-animated" rel="nofollow">О нас</Link>
                <Link to="/404" className="menu__mobile-link is-animated">Условия</Link>
                <Link to="/questions" className="menu__mobile-link is-animated" rel="nofollow">Частые вопросы</Link>
            </nav>
            <div className="menu__login is-animated" href="" target="_blank" rel="nofollow" onClick={onClick}>Войти</div>
        </div>
    </div>
    )
}

export default HeaderMobile;