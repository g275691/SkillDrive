import React, { useEffect, useState } from 'react';
import InputMenu from '../Global/InputMenu/InputMenu';
import { useForm  } from 'react-hook-form';
import OnSubmit from './OnSubmit';

const Step1 = ({
    isStep, step1Forms
}) => {

    const { register, getValues, errors } = useForm({
        mode: 'onTouched',
        defaultValues: step1Forms && step1Forms
    });

    const [step1OK, setStep1OK] = useState(false);

    useEffect(()=> {
        
    })

    const unlockSubmit = () => {
        let isNotEmpty = Object.values(getValues())
        .every(el => el.length >=1 );

        isStep == 1 && isNotEmpty ? setStep1OK(true) : setStep1OK(false);
    }

    return (<>
        <form>
            <div className="form-container">
                <fieldset>
                    <legend>Информация об автомобиле</legend>
                    <div className="form-block">
                        <span>Марка</span>
                        <InputMenu menuBrand arrow
                        placeholder="Acura"
                        list={["Acura"]}
                        ref={register({ required: true })} name="brand"
                        errorName={errors.brand}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>Модель</span>
                        <InputMenu 
                        placeholder="3-series" 
                        ref={register({ required: true })} name="model"
                        errorName={errors.model}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>Год выпуска</span>
                        <InputMenu type="number"
                        isMini
                        placeholder="2018" 
                        ref={register({ required: true })} name="year"
                        errorName={errors.year}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>Гос. номер</span>
                        <InputMenu 
                        isMini
                        placeholder="М123КА178" 
                        ref={register({ required: true })} name="licence"
                        errorName={errors.licence}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>VIN</span>
                        <InputMenu 
                        placeholder="WBADM6343YGU11738" 
                        ref={register({ required: true })} name="VIN"
                        errorName={errors.VIN}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>Цвет</span>
                        <InputMenu 
                        placeholder="Синий" 
                        ref={register({ required: true })} name="color"
                        errorName={errors.color}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>

                    <div className="form-block">
                        <span>Тип двигателя</span>
                        <InputMenu arrow
                        defaultValue="Бензин" readOnly
                        list={["Бензин", "Газ", "Дизель"]}
                        ref={register({ required: true })} name="engine"
                        errorName={errors.engine}
                        unlockSubmit={unlockSubmit}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>Объем</span>
                        <InputMenu type="number"
                        isMini
                        placeholder="2,0 л" 
                        ref={register({ required: true })} name="volume"
                        errorName={errors.volume}
                        unlockSubmit={unlockSubmit}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                    <span>Мощность</span>
                        <div className="form-block-engine">

                            <InputMenu 
                            placeholder="184 л.с." name="power"
                            ref={register({ required: true })} 
                            errorName={errors.power}
                            unlockSubmit={unlockSubmit}
                            />
                            <InputMenu type="number"
                            placeholder="135,332 кВт" 
                            
                            readOnly
                            />
                        </div>
                    </div>
                    <div className="form-block">
                        <span>Трансмиссия</span>
                        <InputMenu arrow
                        readOnly
                        defaultValue="Автоматическая" 
                        list={["Автоматическая", "Механика"]}
                        ref={register({ required: true })} name="transmission"
                        errorName={errors.transmission}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>Пробег</span>
                        <InputMenu type="number"
                        isMini
                        placeholder="24 000 км" 
                        ref={register({ required: true })} name="mileage"
                        errorName={errors.mileage}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>Серия и номер ПТС</span>
                        <InputMenu 
                        placeholder="78 МК 213456" 
                        ref={register({ required: true })} name="PTS"
                        errorName={errors.PTS}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>Серия и номер СТС</span>
                        <InputMenu 
                        placeholder="78 МК 213456" 
                        ref={register({ required: true })} name="STS"
                        errorName={errors.STS}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                </fieldset>
                <fieldset>
                    <legend>Стоимость аренды</legend>
                    <div className="form-block">
                        <span>Обычная цена</span>
                        <InputMenu type="number"
                        isMini
                        placeholder="2 300 ₽/сутки" 
                        ref={register({ required: true })} name="price"
                        errorName={errors.price}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>Цена при аренде на 3 дня</span>
                        <InputMenu type="number"
                        isMini
                        placeholder="2 100 ₽/сутки" 
                        ref={register({ required: true })} name="price3"
                        errorName={errors.price3}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>Цена при аренде более 5 дней</span>
                        <InputMenu type="number"
                        isMini
                        placeholder="2 000 ₽/сутки" 
                        ref={register({ required: true })} name="price5"
                        errorName={errors.price5}
                        unlockSubmit={unlockSubmit}
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
                        errorName={errors.OSAGO}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                    <div className="form-block">
                        <span>Полис КАСКО (если есть)</span>
                        <InputMenu 
                        placeholder="ААА 123456789" 
                        ref={register({ required: true })} name="CASCO"
                        errorName={errors.CASCO}
                        unlockSubmit={unlockSubmit}
                        />
                    </div>
                </fieldset>
                
            </div>
            
        </form>
        <OnSubmit step1Values={getValues()} step1OK={step1OK}/>
        </>
    )
}

export default Step1;

