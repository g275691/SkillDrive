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
import iconLupa from '../../Assets/img/Rent-page/icon-lupa.svg';

import { YMaps, Map, Placemark } from "react-yandex-maps";

export const RentPage = ({carsList
    , setCarsList, sortCarsList,
    firstCarLocation
    ,}) => {

    let [carsCity, setCarsCity] = useState([]);
    let [carsCategory, setCarsCategory] = useState([]);

    let [isFinder, setFinder] = useState(false);
    let [isMapOpen, setMapOpen] = useState(false);
    
    const mapState = React.useMemo(() => ({ center: firstCarLocation, zoom: 13 }), [
        firstCarLocation,
    ])
    const windowHeight = window.screen.height;

    useEffect(() => {
        sortCarsList(setCarsList, "http://localhost:8000/rent-car/start?city=Санкт-Петербург&category=Легковая");
        
        fetch('http://localhost:8000/rent-car/start')
        .then(date => date.json()
        .then(json => {
            json.forEach(el=>{
                carsCity.push(el.city);
                carsCategory.push(el.category); 
            });
            
            setCarsCity([...new Set(carsCity)]);
            setCarsCategory([...new Set(carsCategory)]);
          
        }))
    }, [])

    const dispatch = useDispatch();
    const { register, getValues } = useForm({
        mode: 'onTouched',
    });

    const availableCar = useSelector(state => state.global.availableCar);
    const availableCar2 = useSelector(state => state.global.availableCar2);

    return (
        <>
        <Header />
        <div className="rent-page">
            <div className={isMapOpen ? "rent-page-container finder" : "rent-page-container"}>
                {!isFinder && <h2>Арендуйте автомобиль</h2>}
                <form className={isFinder ? "rent-page-container__filter finder" : "rent-page-container__filter"} 
                onSubmit={e => e.preventDefault()}>
                    <div className="input-wrapper">
                        <InputMenu list={carsCity} defaultValue="Санкт-Петербург" 
                        name="city" label="Местоположение" id="rent-city"
                        ref={register({ required: true })}
                        />

                        <InputMenu 
                        name="date" label="Период аренды" value={`${setFormatDate(availableCar)} – ${setFormatDate(availableCar2)}`}
                        ref={register({ required: true })} id="rent-date"
                        datePicker stateDate={availableCar} stateDate2={availableCar2} 
                        stateDispatch={setAvailableCar} stateDispatch2={setAvailableCar2}
                        />
                        
                        <InputMenu list={carsCategory} defaultValue="Легковая" 
                        name="category" label="Категория" category id="rent-category"
                        ref={register({ required: true })}/>
                    </div>
                    <div className={isMapOpen ? "button-wrapper is-map" : "button-wrapper"} >
                        <button 
                        onClick={()=> {
                            new Date(availableCar) > new Date(availableCar2) ? dispatch(setAvailableCar2(availableCar)) : "";
                            sortCarsList(setCarsList, `http://localhost:8000/rent-car?city=${getValues().city}&category=${getValues().category}&dateAvailable=${availableCar}|${availableCar2}`);                          
                        }
                    }>{!isMapOpen ? "Найти "
                    : <img src={ iconLupa } ></img>
                    }</button>
                    </div>
                </form>
                {!isFinder 
                ? <span className="rent-page-recommend">Рекомендуем поблизости</span>
                : <div className="rent-page-container__sort">
                <div className="wrapper">
                    <button >Любая цена</button>
                    <button>Любые КПП</button>
                    <button>Любой привод</button>
                    <button>Любые двигатели</button>
                </div>
                <div className="map-wrapper"
                onClick={()=> {
                    isMapOpen ? setMapOpen(false) : setMapOpen(true);
                    ;}}>
                    
                    {!isMapOpen && <> 
                    <img src={iconMap} /> 
                    <span className="open-map">Показать карту</span> </>}
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
            
            {isMapOpen ? 
                <div className="yandex__map" 
                style={{ height: windowHeight, width: "100%", position: "sticky", top: "0"
                , display: "flex", flexDirection: "column" }}>
                    <div className="yandex__map-cancel"
                    onClick={()=>setMapOpen(false)}>×</div>
                    <YMaps >
                        <Map width="100%" height="100%"
                        state={mapState}
                        modules={[
                            "layout.ImageWithContent", 
                            'geoObject.addon.balloon', 
                            'geoObject.addon.hint',
                        ]}>
                            <Placemark geometry={[59.91, 30.315332]} 
                            properties={{
    
                                balloonContent: `<div>TEST</div>`

                            }}
                            />
                            {carsList.map((el, i) => {
                                return <Placemark key={i} 
                                geometry={el.geo} 
                                properties={{
                                    
                                    balloonContent: 
                                    `
                                    <div style="display: flex; flex-direction: column">
                                        <div style="background: url(http://localhost:8000/img-car/${el.owner.mail}/carPhotos/${el.photo}); background-size: cover; background-position: center; width: 260px; height: 160px; border-radius: 8px"></div>
                                        
                                        <div style="margin-top: 20px; margin-left: 20px; margin-bottom: 20px">
                                            <div style="font-size: 16px; font-family: Roboto; font-weight: 600">${el.brand} ${el.model}, ${el.year}</div>
                                            <div style="display: flex; font-size: 14px; font-family: Roboto; margin-top: 8px"> 
                                                <div>${el.price} ₽ в сутки</div>
                                                <div style="margin-left: auto; margin-right: 20px"><span style="color:#F2C94C">★ </span>${el.rating} (12)</div>

                                            </div>    
                                        </div>
                                    </div>
                                    `,
                                    iconContent: `<b>${el.price} ₽</b>`
                                }}
                                options={{
                                    preset: 'islands#grayStretchyIcon',
                                }}/>
                            })}
                        </Map>
                    </YMaps> 
            </div>
           : ""}
        </div>
        <Footer />
        </>
    )
}
