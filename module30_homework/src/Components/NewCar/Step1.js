import React, { useEffect, useState } from 'react';
import InputMenu from '../Global/InputMenu/InputMenu';
import FormBlock from '../Registr-page/Step1/Formblocks/FormBlock';
import { useForm  } from 'react-hook-form';

const Step1 = ({

}) => {

    const { register, handleSubmit, getValues, errors } = useForm({
        mode: 'onTouched',
    });

    const onSubmit = e => {
        e.preventDefault();
        console.log(getValues())
    }

    return (
        <form>
            <div className="form-container">
                <fieldset>
                    <legend>Информация об автомобиле</legend>
                    <div className="form-block">
                        <span>Марка</span>
                        <InputMenu menuBrand arrow
                        defaultValue="Acura" 
                        list={[]}
                        ref={register({ required: true })} name="brand"
                        />
                    </div>
                    <div className="form-block">
                        <span>Модель</span>
                        <InputMenu 
                        placeholder="3-series" 
                        ref={register({ required: true })} name="model"
                        />
                    </div>
                    <div className="form-block">
                        <span>Год выпуска</span>
                        <InputMenu 
                        isMini
                        placeholder="2018" 
                        ref={register({ required: true })} name="year"
                        />
                    </div>
                    <div className="form-block">
                        <span>Гос. номер</span>
                        <InputMenu 
                        isMini
                        placeholder="М123КА178" 
                        ref={register({ required: true })} name="licence"
                        />
                    </div>
                    <div className="form-block">
                        <span>VIN</span>
                        <InputMenu 
                        placeholder="WBADM6343YGU11738" 
                        ref={register({ required: true })} name="VIN"
                        />
                    </div>
                    <div className="form-block">
                        <span>Цвет</span>
                        <InputMenu 
                        defaultValue="Синий" 
                        ref={register({ required: true })} name="color"
                        />
                    </div>

                    <div className="form-block">
                        <span>Тип двигателя</span>
                        <InputMenu arrow
                        defaultValue="Бензин" readOnly
                        list={["Бензин", "Газ", "Дизель"]}
                        ref={register({ required: true })} name="engine"
                        />
                    </div>
                    <div className="form-block">
                        <span>Объем</span>
                        <InputMenu 
                        isMini
                        placeholder="2,0 л" 
                        ref={register({ required: true })} name="volume"
                        />
                    </div>
                    <div className="form-block">
                    <span>Мощность</span>
                        <div className="form-block-engine">

                            <InputMenu 
                            placeholder="184 л.с." 
                            />
                            <InputMenu 
                            placeholder="135,332 кВт" 
                            ref={register({ required: true })} name="power"
                            />
                        </div>
                    </div>
                    <div className="form-block">
                        <span>Трансмиссия</span>
                        <InputMenu arrow
                        readOnly
                        defaultValue="Трансмиссия" 
                        list={["Автоматическая", "Механика"]}
                        ref={register({ required: true })} name="transmission"
                        />
                    </div>
                    <div className="form-block">
                        <span>Пробег</span>
                        <InputMenu 
                        isMini
                        placeholder="24 000 км" 
                        ref={register({ required: true })} name="mileage"
                        />
                    </div>
                    <div className="form-block">
                        <span>Серия и номер ПТС</span>
                        <InputMenu 
                        placeholder="78 МК 213456" 
                        ref={register({ required: true })} name="PTS"
                        />
                    </div>
                    <div className="form-block">
                        <span>Серия и номер СТС</span>
                        <InputMenu 
                        placeholder="78 МК 213456" 
                        ref={register({ required: true })} name="STS"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Стоимость аренды</legend>
                    <div className="form-block">
                        <span>Обычная цена</span>
                        <InputMenu 
                        isMini
                        placeholder="2 300 ₽/сутки" 
                        ref={register({ required: true })} name="price"
                        />
                    </div>
                    <div className="form-block">
                        <span>Цена при аренде на 3 дня</span>
                        <InputMenu 
                        isMini
                        placeholder="2 100 ₽/сутки" 
                        ref={register({ required: true })} name="price3"
                        />
                    </div>
                    <div className="form-block">
                        <span>Цена при аренде более 5 дней</span>
                        <InputMenu 
                        isMini
                        placeholder="2 000 ₽/сутки" 
                        ref={register({ required: true })} name="price5"
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Страхование</legend>
                    <div className="form-block">
                        <span>Полис ОСАГО</span>
                        <InputMenu 
                        placeholder="ААА 123456789" 
                        ref={register({ required: true })} name="OSAGO"
                        />
                    </div>
                    <div className="form-block">
                        <span>Полис КАСКО (если есть)</span>
                        <InputMenu 
                        placeholder="ААА 123456789" 
                        ref={register({ required: true })} name="CASCO"
                        />
                    </div>
                </fieldset>
                <div className="button-wrapper">
                    <button onClick={onSubmit}>Продолжить</button>
                </div>
            </div>
        </form>
    )
}

export default Step1;

