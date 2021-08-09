import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCarPage } from '../../Store/CarPage/actions';
import Header from '../Global/Header/Header';
import SuccessRegistrationRent from './SuccessRegistrationRent';
import { Link } from 'react-router-dom';
import DatePicker from '../Global/Datepicker/DatePicker';
import { setAvailableCar, setAvailableCar2 } from '../../Store/Global/actions';
import InputMenu from '../Global/InputMenu/InputMenu';
import { setFormatDate } from '../RentPage/SetFormatDate';
import { useForm  } from 'react-hook-form';
import Step2Item from '../NewCar/Step2Item';
import step2Service from '../NewCar/step2Service.json';
import { step2Options } from '../NewCar/step2Options';

export const RegistrationRent = ({

}) => {

    const [active, setActive] = useState(false);
    const carPage = useSelector(state => state.CarPage.carPage);

    const [successPage, setSuccessPage] = useState(false);

    let pageId = window.location.search.slice(1);

    const dispatch = useDispatch();
    const availableCar = useSelector(state => state.global.availableCar);
    const availableCar2 = useSelector(state => state.global.availableCar2);

    const { register, getValues } = useForm({
        mode: 'onTouched',
    });

    useEffect(()=>{
        dispatch(setCarPage(pageId));
    },[])

    if(!carPage[0]) return (<div><Header/></div>)
    if(successPage) return <SuccessRegistrationRent />
    return (<>
        <Header/>
        <div className="registration-rent__container">
            <div className="back-page-arrow">
                <span className="icon-back"></span>
                <span>Назад</span>
                <Link to={`car-page?${pageId}`}></Link>
            </div>
            <h2>Оформление аренды</h2>



            <h3>Состав заказа</h3>
            <div className="wrapper">
                <div className="registration-rent__container-order">
                <div className="registration-rent__container-check">
                <div className="registration-rent__container-check-rect">
                    <h4>Ваш чек</h4>
                    <div className="wrapper">
                        <div className="registration-rent__container-check-left">
                            <div>Стоимость аренды</div>
                            <div>1231231 123</div>
                            <div>Доп. услуги</div>
                            <div>Комиссия сервиса</div>
                        </div>
                        <div className="registration-rent__container-check-right">
                            <div>{carPage[0].price}</div>
                            <div>{carPage[0].price}</div>
                            <div>{carPage[0].price}</div>
                            <div>1000 ₽</div>
                        </div>
                    </div>
                    <div className="registration-rent__container-check-rect-strip"></div>
                    <div className="wrapper wrapper-price">
                        <div>К оплате</div>
                        <div>5 800 ₽</div>
                    </div>
                </div>
            </div>
                    <div className="wrapper">
                        <img src={carPage[0].photosCars[0]}></img>
                        <div className="car-info">
                            <div>
                                <span style={{color: "#F2C94C"}}>★</span> {`${carPage[0].rating}`} <span>{`(${carPage[0].ratingCount})`}</span>
                            </div> 
                            <div>{`${carPage[0].brand} ${carPage[0].model}, ${carPage[0].year}`}</div>
                            <div>{`${carPage[0].price} ₽ в сутки`}</div>
                        </div>

                    </div>

                </div>
            </div>
            <h3>Информация о поездке</h3>
                <div className="registration-rent__container-trip">
                    <div>
                        <span>Период аренды</span>
                        <InputMenu
                            name="date" label="Период аренды" value={`${setFormatDate(availableCar)} – ${setFormatDate(availableCar2)}`}
                            ref={register({ required: true })} id="rent-date"
                            datePicker stateDate={availableCar} stateDate2={availableCar2} 
                            stateDispatch={setAvailableCar} stateDispatch2={setAvailableCar2}  
                        />
                    </div>
                    <div>
                        <span>Планы на поездку</span>
                        <textarea rows="8" 
                        placeholder="Опишите свои планы на поездку для вледельца автомобиля"> 
                        </textarea>
                    </div>
            </div>
            <h3 className="h3-options">Дополнительные услуги</h3>
            <div className="registration-rent__container-options">
                {step2Service.Services.map((el, i) => {
                        return <Step2Item key={i} index={i+step2Options.length} service
                        text={el.service} description={el.description} 
                        />
                })}
            </div>

            <div className="submit-block">
                <div className="submit-block-rect"></div>
                <div className="button-wrapper">
                <button type="submit">Перейти к оплате</button>
                <div className="cssload-container">
                    {/* <div className={buttonLoad 
                        ? "cssload-zenith animate" : "cssload-zenith"}>
                    </div> */}
                    </div>
                </div>
            </div>

    </div>
      
    </>)
}
