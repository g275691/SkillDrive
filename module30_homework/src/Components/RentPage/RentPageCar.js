import React, { useEffect, useState } from 'react';
import iconCran from '../../Assets/img/Rent-page/icon-cran.svg';
import iconTechno from '../../Assets/img/Rent-page/icon-techno.svg';

export const RentPageCar = ({
    carsList,
    isFinder, isMapOpen, myCars,
    index
}) => {

    useState(()=> {
        
    })

    let imgCar = `http://localhost:8000/img-car/${carsList[index].owner.mail}/carPhotos/${carsList[index].photo}`;
    //let imgCar = carsList[index].photosCars[0] ? carsList[index].photosCars[0] : "qwert"
    let nameCar = `${carsList[index].brand} ${carsList[index].model}, ${carsList[index].year}`;
    let priceCar = `${carsList[index].price} ₽/сутки`;
    let imgAvatar = `http://localhost:8000/img-car/${carsList[index].owner.mail}/avatar/avatar.jpg`;
    let ratingCar = carsList[index].rating;
    let power = carsList[index].power;
    let engine = carsList[index].engine;
    let transmission = carsList[index].transmission;
    let driveUnit = carsList[index].driveUnit;

    return (
        <div className={isFinder ? "car-frame is-finder" : "car-frame"} 
        >
            <img className="car-frame-car" src={imgCar}></img>
            {!myCars && <div className={isFinder ? "wrapper is-finder" : "wrapper"}>
                <div className="car-frame-avatar" 
                style={{backgroundImage:`url(${imgAvatar})`, backgroundSize: `cover`}}></div>
            </div> }

            {isFinder 
            ? <div className="car-frame-info">
                <div className="car-frame-rating">
                    <span style={{color: "#F2C94C"}}>★</span> {ratingCar} (12)
                </div>
                <div className={isFinder ? "car-frame-name finder" : "car-frame-name"}>{nameCar}</div>
                <div className={isMapOpen ? "car-frame-info-wrapper is-map-open" : "car-frame-info-wrapper"}>
                    <div className="car-frame-info-engine">
                        <img src={iconCran}/>
                        <span>2.0 л / {power} л.с. / {engine}</span>
                    </div>
                    <div 
                    className={isMapOpen 
                        ? "info-driveunit-map" 
                        : ""}>
                        <img className={!isMapOpen ? "img-driveunit-no-map" : ""}
                        src={iconTechno}/>
                        <span>{transmission} / {driveUnit}</span>
                    </div>

                </div>
                <p className="car-frame-price">{priceCar}</p>
            </div>
            : <div className="car-frame-name">{nameCar}
                <p>от {priceCar}</p>
            </div>
            }
            {isFinder && !isMapOpen && !myCars ?  
            <div className="car-frame-button-wrapper">
                <button className="car-frame-action">Арендовать</button>
            </div> : ""
            }


        </div>
    )
}