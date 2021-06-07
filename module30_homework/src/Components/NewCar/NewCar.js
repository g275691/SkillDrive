import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../Containers/Header/Header';
import BackPageArrow from '../Global/BackPageArrow/BackPageArrow';

import Step1 from './Step1';

export const NewCar = ({
    warning,
    isStep1, isStep2, isStep3,
    setStep1, setStep2, setStep3

}) => {
    

    return (<>
        <div className={warning ? "warning is-active" : "warning"}>{warning}</div>
        <Header />
        <div className="newcar__container">
            <BackPageArrow isStep1={isStep1} isStep2={isStep2} isStep3={isStep3}
            setStep1={setStep1} setStep2={setStep2} setStep3={setStep3}/>

            <div className="newcar__container-step">
                {isStep3 ? "Шаг 3 из 3" 
                : isStep2 ? "Шаг 2 из 3" 
                : "Шаг 1 из 3"}
            </div>
            <h1>
            {isStep3 ? "Фото автомобиля" 
            : isStep2 ? "Дополнительно" 
            : "Новый автомобиль"}
            </h1>
            {/* <span className="newcar__container-description">
                Информация об автомобиле
            </span> */}
            <Step1 />
        </div>
    </>)
}
