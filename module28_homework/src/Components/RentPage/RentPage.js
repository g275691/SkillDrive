import React, { useEffect, useState } from 'react';
import Header from '../../Containers/Header/Header';
import Footer from '../Global/Footer/Footer';
import RentPageCar from '../../Containers/RentPage/RentPageCar';

import { useForm  } from 'react-hook-form';
import InputMenu from '../Global/InputMenu/InputMenu';
import { setAvailableCar, setAvailableCar2 } from '../../Store/Global/actions';
import { useSelector } from 'react-redux';
import { setFormatDate } from './SetFormatDate';

export const RentPage = ({carsList, carsListFilter
    , setCarsList, setCarsListFilter, sortCarsList
    ,}) => {
    let [carsCity, setCarsCity] = useState([]);
    let [carsCategory, setCarsCategory] = useState([]);

    
        
    useEffect(() => {
        fetch('http://localhost:8000/rent-car')
        .then(date => date.json()
        .then(json => {

            sortCarsList(setCarsList, "http://localhost:8000/rent-car?city=Санкт-Петербург&category=Легковая");

            json.forEach(el=>{
                carsCity.push(el.city);
                carsCategory.push(el.category)
            });
            setCarsCity([...new Set(carsCity)]);
            setCarsCategory([...new Set(carsCategory)]);

        }))

    }, [])

   const { register, handleSubmit, getValues } = useForm({
        mode: 'onTouched',
    });
    const onSubmit = (data) => {
        console.log(data); 
    };

    const availableCar = useSelector(state => state.global.availableCar);
    const availableCar2 = useSelector(state => state.global.availableCar2);
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
                    name="date" label="Период аренды" value={`${setFormatDate(availableCar)} – ${setFormatDate(availableCar2)}`}
                    ref={register({ required: true })}
                    datePicker stateDate={availableCar} stateDate2={availableCar2} 
                    stateDispatch={setAvailableCar} stateDispatch2={setAvailableCar2}
                    />
                    
                    <InputMenu list={carsCategory} defaultValue="Легковая" 
                    name="category" label="Категория"
                    ref={register({ required: true })}/>


                    <div className="button-wrapper">
                        <button 
                        onClick={()=> {
                            // fetch(`http://localhost:8000/rent-car?city=${getValues().city}&category=${getValues().category}&dateAvailable=${availableCar}|${availableCar2}`)
                            // .then(response => response.json()
                            // .then(json =>
                            //     setCarsList(json)
                            // ))
                            sortCarsList(setCarsList, `http://localhost:8000/rent-car?city=${getValues().city}&category=${getValues().category}&dateAvailable=${availableCar}|${availableCar2}`);
                        }   
                    }>Найти</button>
                    </div>
                </form>
                <span>Рекомендуем поблизости</span>
                <div className="wrapper">
                <div className="rent-page-container__cars">
                    {carsList.map((el, i) => {
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
