import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../img/logo.svg';
import success from '../../../img/success.svg';

const Success = () => {
    useEffect(() => {
        document.title="SkillDrive. Регистрация завершена";
    });

    return (
        <div className="success__container">
            <img src={logo} alt="Logo" />
            <img className='success__container-img' src={success} alt="Success" />
            <h2>Успех!</h2>
            <span className="success__container-text">Вы успешно зарегистрировались. Дождитесь проверки документов и начните пользоваться сервисом.</span>
            <Link to="/" rel="nofollow">
                <button>Перейти на главную</button>
            </Link>
        </div>
    )
}
export default Success;