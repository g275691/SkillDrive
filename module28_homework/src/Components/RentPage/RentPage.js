import React, { useEffect, useState } from 'react';
import Header from '../../Containers/Header/Header';
import DatePicker from '../Global/Datepicker/DatePicker';
import Footer from '../Global/Footer/Footer';
import RentPageCar from '../../Containers/RentPage/RentPageCar';
import Select from '@material-ui/core/Select';

import MenuItem from '@material-ui/core/MenuItem';
import InputBlock from '../Global/Login/inputBlock/inputBlock';
import { useForm  } from 'react-hook-form';
import InputMenu from '../Global/InputMenu/InputMenu';
 

export const RentPage = ({carsList
    , setCarsList}) => {
    let [carsCity, setCarsCity] = useState([]);
    let [carsCategory, setCarsCategory] = useState([]);

    useEffect(() => {
        console.log(carsList);
        fetch('http://localhost:8000/rent-car')
        .then(date => date.json()
        .then(json => {
            setCarsList(json);

            json.forEach(el=>{
                carsCity.push(el.city);
                carsCategory.push(el.category)
            });

            setCarsCity(carsCity);
            setCarsCategory([...new Set(carsCategory)]);
        }))

    }, [])

   const { register, handleSubmit, getValues, errors } = useForm({
    mode: 'onTouched',

});

    return (
        <>
        <Header />
        <div className="rent-page">
            <div className="rent-page-container">
                <h2
                onClick>Арендуйте автомобиль</h2>
                <div className="rent-page-container__filter">
                    <InputMenu list={carsCity} defaultValue="Санкт-Петербург"/>
                    <InputMenu list={carsCategory} defaultValue="Легковая"/>


                    {/* <DatePicker /> */}
                    {/* <div className="rent-page-container__filter__category"></div> */}
                    <div className="button-wrapper">
                        <button
                        >Найти</button>
                    </div>
                </div>
                <span>Рекомендуем поблизости</span>
                <div className="wrapper">
                <div className="rent-page-container__cars">
                    {carsList.map((el, i) => {
                        return <RentPageCar key={el} index={i}/>
                    })}
                </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}
