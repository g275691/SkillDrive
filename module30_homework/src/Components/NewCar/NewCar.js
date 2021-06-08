import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../Containers/Header/Header';
import BackPageArrowC from '../Global/BackPageArrow/BackPageArrowC';
import OnSubmit from './OnSubmit';

import Step1 from './Step1';
import Step2 from './Step2';

export const NewCar = ({
    warning,
    isStep, 
    setStep, 
}) => {
    
    return (<>
        <div className={warning ? "warning is-active" : "warning"}>{warning}</div>
        <Header />
        <div className="newcar__container">
            {isStep != 1 ? <BackPageArrowC isStep={isStep} setStep={setStep} /> : ""}
            <div className="newcar__container-step">
                {isStep == 4 ? "Шаг 4 из 4"
                : isStep == 3 ? "Шаг 3 из 4" 
                : isStep == 2 ? "Шаг 2 из 4" 
                : "Шаг 1 из 4"}
            </div>
            <h1>
            {isStep == 3 ? "Фото автомобиля" 
            : isStep == 2 ? "Дополнительно" 
            : "Новый автомобиль"}
            </h1>
            {/* <span className="newcar__container-description">
                Информация об автомобиле
            </span> */}
            {isStep == 1 && <Step1 />}
            {isStep == 2 && <Step2 />}
            <OnSubmit />
        </div>
    </>)
}
