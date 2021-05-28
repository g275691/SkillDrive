import React, { useEffect, useState } from 'react';
import Header from '../../Containers/Header/Header';
import Footer from '../Global/Footer/Footer';
import RentPageCar from '../../Containers/RentPage/RentPageCar';

import { useForm  } from 'react-hook-form';
import InputMenu from '../Global/InputMenu/InputMenu';
import { setAvailableCar, setAvailableCar2 } from '../../Store/Global/actions';
import { useSelector, useDispatch } from 'react-redux';
import { setFormatDate } from './SetFormatDate';
import iconMap from '../../Assets/img/Rent-page/icon-map.svg';

export const RentPage = ({carsList, carsListFilter
    , setCarsList, setCarsListFilter, sortCarsList
    ,}) => {
    let [carsCity, setCarsCity] = useState([]);
    let [carsCategory, setCarsCategory] = useState([]);

    let [isFinder, setFinder] = useState(true);
        
    useEffect(() => {
        sortCarsList(setCarsList, "http://localhost:8000/rent-car/start?city=Санкт-Петербург&category=Легковая");

        fetch('http://localhost:8000/rent-car/start')
        .then(date => date.json()
        .then(json => {
            json.forEach(el=>{
                carsCity.push(el.city);
                carsCategory.push(el.category)
            });
            setCarsCity([...new Set(carsCity)]);
            setCarsCategory([...new Set(carsCategory)]);
        }))

    }, [])
    const dispatch = useDispatch();
   const { register, handleSubmit, getValues } = useForm({
        mode: 'onTouched',
    });
    const onSubmit = (data) => {
        
    };

    const availableCar = useSelector(state => state.global.availableCar);
    const availableCar2 = useSelector(state => state.global.availableCar2);
    return (
        <>
        <Header />
        <div className="rent-page">
            <div className="rent-page-container">
                {!isFinder && <h2>Арендуйте автомобиль</h2>}
                <form className="rent-page-container__filter" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-wrapper">
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
                    </div>


                    <div className="button-wrapper">
                        <button 
                        onClick={()=> {
                            new Date(availableCar) > new Date(availableCar2) ? dispatch(setAvailableCar2(availableCar)) : "";
                            sortCarsList(setCarsList, `http://localhost:8000/rent-car?city=${getValues().city}&category=${getValues().category}&dateAvailable=${availableCar}|${availableCar2}`);
                            setFinder(true)
                            
                        }   
                    }>Найти</button>
                    </div>
                </form>
                {!isFinder 
                ? <span className="rent-page-recommend">Рекомендуем поблизости</span>
                : <div className="rent-page-container__sort">
                <div className="wrapper">
                    <button>Любая цена</button>
                    <button>Любые КПП</button>
                    <button>Любой привод</button>
                    <button>Любые двигатели</button>
                </div>
                <div className="map-wrapper">
                    <img src={iconMap} />
                    <span className="open-map">Показать карту</span>
                </div>
                
            </div>}

                <div className={isFinder ? "rent-page-container__cars finder" : "rent-page-container__cars"}>
                    {carsList.map((el, i) => {
                        return <RentPageCar key={i} index={i} isFinder={isFinder}/>
                    })}
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}
