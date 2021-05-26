import React, { useEffect, useState } from 'react';

export const RentPageCar = ({
    carsList,

    index
}) => {

    useState(()=> {
        console.log(index)
    })

    let imgCar = `http://localhost:8000/img-car/${carsList[index].owner.mail}/carPhotos/${carsList[index].photo}`;
    let nameCar = `${carsList[index].brand} ${carsList[index].model}, ${carsList[index].year}`;
    let priceCar = `от ${carsList[index].price} ₽/сутки`;
    let imgAvatar = `http://localhost:8000/img-car/${carsList[index].owner.mail}/avatar/avatar.jpg`;

    return (
        <div className="car-frame">
            <img src={imgCar}></img>
            <div className="wrapper">
                <div className="car-frame-avatar" style={{backgroundImage:`url(${imgAvatar})`, backgroundSize: `cover`}}></div>
            </div>
            <div className="car-frame-name">{nameCar}
                <p>{priceCar}</p>
            </div>
        </div>
    )
}