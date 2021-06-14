import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../Containers/Header/Header';
import BackPageArrowC from '../Global/BackPageArrow/BackPageArrowC';
import Step1 from './Step1';
import Step2 from './Step2';
import UploaderCloud from '../Global/UploaderCloud/UploaderCloud';
import OnSubmit from './OnSubmit';
import { cityRegion } from './city';
import { cityGeo } from './cityGeo';

export const NewCar = ({
    warning,
    isStep, 
    setStep, 
    setStep1Forms, step1Forms,
    photosCars, setPhotosCars,
    photosCarsDocs, setPhotosCarsDocs
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
            <h1
            onClick={()=>{
                cityRegion.forEach((el,i) => {
                    el.geo = cityGeo[i]
                })
                console.log(cityRegion);

                // let newCityGeo = [];
                // cityRegion.forEach(el => {
                //     setTimeout(() => {
                //     fetch(`http://search.maps.sputnik.ru/search/addr?q=${el.city}`)
                //     .then(data=>data.json()
                //     .then(json=>{
                //         console.log(json.result.address[0].features[0].geometry.geometries[0].coordinates.reverse());
                //         newCityGeo.push(json.result.address[0].features[0].geometry.geometries[0].coordinates.reverse());
                //         setCityGeo(newCityGeo);
                //     }))
                // }, 500);
                // })
            }}>
            {isStep == 4 ? "Фото документов" 
            : isStep == 3 ? "Фото автомобиля" 
            : isStep == 2 ? "Дополнительно" 
            : "Новый автомобиль"}
            </h1>
            {isStep != 1 || isStep != 2 ? <span className="newcar__container-advice">
                {isStep == 3 ? "Чем больше качественных фотографий вы загрузите, тем выше шанс того, что выберут ваш автомобиль." 
                : isStep == 4 ? "СТС или ПТС автомобиля, полис ОСАГО, полис КАСКО (если есть)" : ""
            }
            </span> : ""}
            {isStep == 1 && <Step1 isStep={isStep} setStep1Forms={setStep1Forms} isStep={isStep} setStep={setStep} step1Forms={step1Forms}/>}
            {isStep == 2 && <Step2 />}
            {isStep == 3 && <UploaderCloud photos={photosCars} setPhotos={setPhotosCars}/>}
            {isStep == 4 && <UploaderCloud photos={photosCarsDocs} setPhotos={setPhotosCarsDocs}/>}
            {/* <OnSubmit setStep1Forms={setStep1Forms} isStep={isStep} setStep={setStep}/> */}
        </div>
    </>)
}
