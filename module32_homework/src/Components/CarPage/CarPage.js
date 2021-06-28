import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackPageArrowC from '../Global/BackPageArrow/BackPageArrowC';
import Header from '../Global/Header/Header';
import { step2Options } from '../NewCar/step2Options';

export const CarPage = ({
    warning, setCarPage,
    carPage
}) => {

    useEffect(()=>{
        setCarPage(window.location.search.slice(1));
    },[])

    if(!carPage) return (<div><Header/></div>)
    return (<>
    <div className={warning ? "warning is-active" : "warning"}>{warning}</div>
    <Header />
    <div className="car-page__container">
        <div className="photo__container">
            <div className="wrapper">
                <div className="main" style={{backgroundImage: `url(${carPage[0].photosCars[0]})`, height: "100%" }}></div>
                {carPage[0].photosCars.length > 1 ? 
                <div className="mini">
                    <div style={{backgroundImage: `url(${carPage[0].photosCars[1]})` }}></div>
                    {carPage[0].photosCars.length > 2 
                    ? <div style={{backgroundImage: `url(${carPage[0].photosCars[2]})` }}>
                        <div className="mini-plus">+ ещё {carPage[0].photosCars.length - 2} фото</div>
                    </div> : ""}
                </div> : ""}
            </div>
        </div>
        {/*<h2>{`${carPage[0].brand} ${carPage[0].model}, ${carPage[0].year}`}</h2>
         <div className="price__container">
            <div className="price__container-item">{`${carPage[0].price} ₽/сут.`}
                <p>обычная аренда</p>
            </div>
            <div className="price__container-item">{`${carPage[0].price3} ₽/сут.`}
                <p>при аренде на 3 дня</p>
            </div>
            <div className="price__container-item">{`${carPage[0].price5} ₽/сут.`}
                <p>при аренде более 5 дней</p>
            </div>
        </div>
        <h3>Характеристики</h3>
        <div className="characteristics__container">
            <div className="characteristics__container-keys">
                <div>Год выпуска</div>
                <div>Двигатель</div>
                <div>Трансмиссия</div>
                <div>Привод</div>
                <div>Пробег</div>
            </div>
            <div className="characteristics__container-props">
                <div>{carPage[0].year}</div>
                <div>{`${carPage[0].volume} л / ${carPage[0].power} л.с. / ${carPage[0].engine}`}</div>
                <div>{carPage[0].transmission}</div>
                <div>{carPage[0].driveUnit}</div>
                <div>{carPage[0].mileage}</div>
            </div>
        </div>
        <div className="submit-block-rect"></div> */}
        <h3>Опции</h3>
        <div className="options__container">
            {carPage[0].options.map((el, i)=> {
                return (
                    el == "true" 
                    ? <div className={`icon-newCar${i}`}>
                        <span>{step2Options[i]}</span>
                    </div>
                    : ""
                )
            })}
        </div>
        <div className="submit-block-rect"></div>
        <h3>Доступность</h3>
    </div>
    </>)

}
