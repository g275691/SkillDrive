import { Link } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BackPageArrowC from '../Global/BackPageArrow/BackPageArrowC';
import DatePicker from '../Global/Datepicker/DatePicker';
import { month } from '../Global/Datepicker/Month';
import Header from '../Global/Header/Header';
import { step2Options } from '../NewCar/step2Options';
import iconSlideShow from '../../Assets/img/Rent-page/slideShow.svg';

export const CarPage = ({
    warning, setCarPage,
    carPage, buttonLoad,
    createTrip
}) => {

    useEffect(()=>{
        setCarPage(window.location.search.slice(1));
    },[])

    const setFormatName = (name) => {
        return name.slice(0, name.indexOf(" "))
        + " "
        + name.slice(name.lastIndexOf(" "))[1] 
        + "."
    }

    const availableCar = useSelector(state => state.global.availableCar);
    const availableCar2 = useSelector(state => state.global.availableCar2);

    const monthDefault = new Date(availableCar).getMonth();
    const availableCarNext = [...availableCar2];
    availableCarNext[1]+=1;

    const date0 = `${month[monthDefault]} ${availableCar[0]}`;
    const date1 = `${month[monthDefault + 1]} ${availableCar[0]}`;

    const [isSlideShow, setSlideShow] = useState(false);
    const [photoNumber, setPhotoNumber] = useState(1);
    const changePhoto = (arrow) => {
        let photo = photoNumber;
        if(arrow == "left") {
            if(photo == 1) {
                setPhotoNumber(carPage[0].photosCars.length);
            } else {
                photo -= 1;
                setPhotoNumber(photo);
            }
        } else {
            if(photo == carPage[0].photosCars.length) {
                setPhotoNumber(1);
            } else {
                photo +=1;
                setPhotoNumber(photo);
            }
        }
    }

    if(!carPage) return (<div><Header/></div>)
    return (<>
    <div className={warning ? "warning is-active" : "warning"}>{warning}</div>
    <Header />
    <div className="car-page__container">
        <div className="photo__container">
            <div className="wrapper">
                <div className="main">
                    <img src={carPage[0].photosCars[0]}/>
                    <div className="main-icon" onClick={()=>setSlideShow(true)}>
                        <img src={iconSlideShow}></img>
                    </div>
                    
                </div>
                {carPage[0].photosCars.length > 1 ? 
                <div className="mini">
                    <div>
                        <img src={carPage[0].photosCars[1]}></img>
                    </div>
                    {carPage[0].photosCars.length > 2 
                    ? <div>
                        <img src={carPage[0].photosCars[2]}></img>
                        {carPage[0].photosCars.length > 3 
                        ? <div className="mini-plus"
                        onClick={()=>setSlideShow(true)}>
                            + ещё {carPage[0].photosCars.length - 3} фото
                        </div> 
                        : ""}
                    </div> : ""}
                    
                </div> : ""}
            </div>
        </div>
        <h2 className="h2-mobil">{`${carPage[0].brand} ${carPage[0].model}, ${carPage[0].year}`}</h2>
        <div className="owner__container">
            <h2>{`${carPage[0].brand} ${carPage[0].model}, ${carPage[0].year}`}</h2>
            <div className="owner__container-rect">
                <div className="owner__container-rect-photo"
                style={{background:`url(${carPage[0].owner.imgAvatar})`, backgroundSize: "cover"}}></div>
                <div className="owner__container-rect-name">{setFormatName(carPage[0].owner.name)}
                    <div>Владелец</div>
                </div>
                <Link>Посмотреть профиль</Link>
            </div>  
        </div>
         <div className="price__container">
            <div className="price__container-item">{`${carPage[0].price} ₽/сут.`}
                <p>обычная аренда</p>
            </div>
            <div className="price__container-item">{`${carPage[0].price3} ₽/сут.`}
                <p>при аренде на 3 дня</p>
            </div>
            <div className="price__container-item">{`${carPage[0].price5} ₽/сут.`}
                <p>при аренде более 5 дней</p>
            </div>
        </div>
        <h3 className="h3-charact">Характеристики</h3>
        <h3 className="h3-mobil">Характеристики</h3>
        <div className="characteristics__container">
            <div className="characteristics__container-keys">
                <div>Год выпуска</div>
                <div>Двигатель</div>
                <div>Трансмиссия</div>
                <div>Привод</div>
                <div>Пробег</div>
            </div>
            <div className="characteristics__container-props">
                <div>{carPage[0].year}</div>
                <div>{`${carPage[0].volume} л / ${carPage[0].power} л.с. / ${carPage[0].engine}`}</div>
                <div>{carPage[0].transmission}</div>
                <div>{carPage[0].driveUnit}</div>
                <div>{`${carPage[0].mileage} км`}</div>
            </div>
        </div>
        <div className="submit-block-rect"></div>
        <h3>Опции</h3>
        <div className="options__container">
            {carPage[0].options.map((el, i)=> {
                return (
                    el == "true" 
                    ? <div className={`icon-newCar${i}`}>
                        <span>{step2Options[i]}</span>
                    </div>
                    : ""
                )
            })}
        </div>
        <div className="submit-block-rect"></div>
        <h3>Доступность</h3>
        <div className="calendar__container">
            <div className="calendar__container-date">{date0}
                <DatePicker enabled="true" twoDate carPage
                stateDate={availableCar} stateDate2={availableCar2}
                />
            </div>
            <div className="calendar__container-date">{date1}
                <DatePicker enabled="true" carPage
                stateDate={availableCarNext} stateDate2={availableCar2}
                />
            </div>
        </div>
        <div className="submit-block-rect"></div>
        <h3>Отзывы</h3>
        <div className="rating">
            <span style={{color: "#F2C94C"}}>★</span> {carPage[0].rating} <span style={{color: "#8D8B99"}}>(4 отзыва)</span>
        </div>
        <div className="submit-block-rect last"></div>
        <div className="button-wrapper">
            <button type="submit"
            onClick={()=>createTrip()}>
            {buttonLoad ? " " : "Арендовать"}
            </button>
            <div className="cssload-container">
                <div className={buttonLoad 
                    ? "cssload-zenith animate" : "cssload-zenith"}>
                </div>
            </div>
            </div>
    </div>
    <div className={isSlideShow ? "slide-show__container" : "slide-show__container is-disable"}>
        <div className="slide-show__container-number">{`${photoNumber} из ${carPage[0].photosCars.length} фото`}</div>
        <div className="slide-show__container-frame">
            <div className="icon-arrow arrow-1" onClick={()=>changePhoto("left")}></div>
            <img src={carPage[0].photosCars[photoNumber-1]}
             ></img>
            <div className="icon-arrow arrow-2" onClick={()=>changePhoto("right")}></div>
        </div>
        <div className="slide-show__container-close" onClick={()=>setSlideShow(false)}>×</div>
        </div>
    </>)

}
