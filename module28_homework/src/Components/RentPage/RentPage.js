import React, { useEffect, useState } from 'react';
import Header from '../../Containers/Header/Header';
import DatePicker from '../Global/Datepicker/DatePicker';
import Footer from '../Global/Footer/Footer';
import RentPageCar from '../../Containers/RentPage/RentPageCar';

import InputBlock from '../Global/Login/inputBlock/inputBlock';
import { useForm  } from 'react-hook-form';
import InputMenu from '../Global/InputMenu/InputMenu';
import FormBlock from '../Registr-page/Step1/Formblocks/FormBlock';
import { setAvailableCar } from '../../Store/Global/actions';
import { useSelector } from 'react-redux';

export const RentPage = ({carsList, carsListFilter
    , setCarsList, setCarsListFilter, sortCarsList
    ,}) => {
    let [carsCity, setCarsCity] = useState([]);
    let [carsCategory, setCarsCategory] = useState([]);
        
    useEffect(() => {
        fetch('http://localhost:8000/rent-car')
        .then(date => date.json()
        .then(json => {
            setCarsList(json);
            sortCarsList(setCarsListFilter, "http://localhost:8000/rent-car?city=Санкт-Петербург&category=Легковая");

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
    const onSubmit = (data) => {
        console.log(data); 
    };

    const availableCar = useSelector(state => state.global.availableCar);

    return (
        <>
        <Header />
        <div className="rent-page">
            <div className="rent-page-container">
                <h2>Арендуйте автомобиль</h2>
                <form className="rent-page-container__filter" onSubmit={handleSubmit(onSubmit)}>
                    <InputMenu list={carsCity} defaultValue="Санкт-Петербург" 
                    name="city" label="Местоположение"
                    ref={register({ required: true })}/>

                    <InputMenu 
                    name="date" label="Период аренды" value={availableCar}
                    ref={register({ required: true })}
                    datePicker stateDate={availableCar} stateDispatch={setAvailableCar}
                    />
                    
                    <InputMenu list={carsCategory} defaultValue="Легковая" 
                    name="category" label="Категория"
                    ref={register({ required: true })}/>


                    <div className="button-wrapper">
                        <button 
                        onClick={()=> {
                            sortCarsList(setCarsListFilter, `http://localhost:8000/rent-car?city=${getValues().city}&category=${getValues().category}&date=${getValues().date}`);
                        }   
                    }>Найти</button>
                    </div>
                </form>
                <span>Рекомендуем поблизости</span>
                <div className="wrapper">
                <div className="rent-page-container__cars">
                    {carsListFilter.map((el, i) => {
                        return <RentPageCar key={i} index={i}/>
                    })}
                </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}
