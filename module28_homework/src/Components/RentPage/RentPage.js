import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../Containers/Header/Header';
import DatePicker from '../Global/Datepicker/DatePicker';
import Footer from '../Global/Footer/Footer';
import RentPageCar from './RentPageCar';

export const RentPage = ({}) => {

    const [carsList, setCarsList] = useState(false);

    const testFunc = () => fetch('http://localhost:8000/rent-car/testccc');

    return (
        <>
        <Header />
        <div className="rent-page">
            <div className="rent-page-container">
            <h2
            onClick={testFunc}>Арендуйте автомобиль</h2>
            <div className="rent-page-container__filter">
                <div className="rent-page-container__filter__city"></div>
                <div className="rent-page-container__filter__city"></div>
                <div className="rent-page-container__filter__city"></div>
                {/* <DatePicker /> */}
                {/* <div className="rent-page-container__filter__category"></div> */}
                <div className="button-wrapper">
                    <button>Найти</button>
                </div>
            </div>
            <span>Рекомендуем поблизости</span>
            <div className="rent-page-container__cars">
                {[0,1,2,3,4].map(el => {
                    return <RentPageCar key={el}/>
                })}
            </div>
            </div>
        </div>
        <Footer />
        </>
    )
}
