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
import { YMaps, Map } from "react-yandex-maps";

export const RentPage = ({carsList, carsListFilter
    , setCarsList, setCarsListFilter, sortCarsList
    ,}) => {
    let [carsCity, setCarsCity] = useState([]);
    let [carsCategory, setCarsCategory] = useState([]);

    let [isFinder, setFinder] = useState(true);
    let [isMapOpen, setMapOpen] = useState(true);
    
    const mapState = {
        center: [55.76, 37.64],
        zoom: 10,
        controls: []
      };

    useEffect(() => {
        sortCarsList(setCarsList, "http://localhost:8000/rent-car/start?city=Санкт-Петербург&category=Легковая");
        


        fetch('http://localhost:8000/rent-car/start')
        .then(date => date.json()
        .then(json => {
            let map = DG.map('map', {
                center: [59.919984, 30.338949],
                zoom: 13,
                zoomControl: false,
                fullscreenControl: false
            });
            var myIcon = DG.icon({
                
            });
            
            json.forEach(el=>{
                var myDivIcon = DG.divIcon({
                    iconSize: [69, 20],
                    iconUrl: 'https://img2.freepng.ru/20180717/jqz/kisspng-drop-shadow-omni-limousine-shadow-drop-5b4e354fc1f687.5168427415318521117945.jpg',
                    html: `<div style="font-size: 14px; font-family: Roboto; color: white; display: flex; justify-content: center; background: #61A199">
                    <span>${el.price} ₽<span>
                    </div>`,


                });
                
                let myFunction = () => console.log("test")
                DG.marker([el.geo.latitude, el.geo.longitude], {
                    icon: myDivIcon,
                    title: "tachka",
                    click: myFunction
                }).addTo(map);


                carsCity.push(el.city);
                carsCategory.push(el.category);
                
            });
            map.on('click', function(e) {
                console.log("test")
            })
            
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
            <div className={isMapOpen ? "rent-page-container finder" : "rent-page-container"}>
                {!isFinder && <h2>Арендуйте автомобиль</h2>}
                <form className={isFinder ? "rent-page-container__filter finder" : "rent-page-container__filter"} 
                onSubmit={handleSubmit(onSubmit)}>
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


                    <div className="button-wrapper" style={{paddingRight: isMapOpen ? "41px" : ""}}>
                        <button 
                        onClick={()=> {
                            new Date(availableCar) > new Date(availableCar2) ? dispatch(setAvailableCar2(availableCar)) : "";
                            sortCarsList(setCarsList, `http://localhost:8000/rent-car?city=${getValues().city}&category=${getValues().category}&dateAvailable=${availableCar}|${availableCar2}`);
                            setFinder(true)
                            
                        }   
                    }>{!isMapOpen ? "Найти ": "🔍"}</button>
                    </div>
                </form>
                {!isFinder 
                ? <span className="rent-page-recommend">Рекомендуем поблизости</span>
                : <div className="rent-page-container__sort">
                <div className="wrapper">
                    <button onClick={map=>{

                            map.panTo([54.98, 82.89]);

                        }}
                        >Любая цена</button>
                    <button>Любые КПП</button>
                    <button>Любой привод</button>
                    <button>Любые двигатели</button>
                </div>
                <div className="map-wrapper"
                onClick={()=> {
                    isMapOpen ? setMapOpen(false) : setMapOpen(true);

                    ;}}>
                    <img src={iconMap} />
                    <span className="open-map">Показать карту</span>
                </div>
                
            </div>}

                <div className={isFinder ? "rent-page-container__cars finder" : "rent-page-container__cars"}>
                    {carsList.map((el, i) => {
                        return <RentPageCar key={i} index={i} 
                        isFinder={isFinder}
                        isMapOpen={isMapOpen}/>
                    })}
                </div>
            </div>

            {/* {isMapOpen ? <div id="map" className="gis__map"></div> : ""} */}
            {isMapOpen ? <YMaps>
             <div>

                <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
            </div> 
  </YMaps> : ""}
        </div>
        
        <Footer />
        </>
    )
}
