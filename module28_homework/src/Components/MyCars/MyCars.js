import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../Containers/Header/Header';
import RentPageCar from '../../Containers/RentPage/RentPageCar';



export const MyCars = ({
    sortCarsList, setCarsList
}) => {

    useEffect(()=> {
        sortCarsList(setCarsList, `http://localhost:8000/rent-car/${localStorage.getItem("userMail")}`);

    }, [])

    const carsList = useSelector(state => state.RentPage.carsList);

    return ( <>
        <Header />
        <div className="mycars__container">
            <div className="mycars__container-wrapper">
                <h2>Мои автомобили</h2>
                {carsList.map((el, i) => {
                    return <RentPageCar key={i} index={i} isFinder="true"/>
                })}
            </div>
        </div>
        </>
    )
}
