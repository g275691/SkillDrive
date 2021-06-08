import React, { useEffect, useState } from 'react';
import Step2Item from './Step2Item';
import { step2Options } from './step2Options';
import step2Service from './step2Service.json';

const Step2 = ({

}) => {
    
    useEffect(()=> {
        console.log(data);
    })

    const [data, setData] = useState(step2Options.concat(step2Service.Services).map(el => el = false));

    return (
        <form>
        <div className="form-container">
            <fieldset>
                <legend>Опции автомобиля</legend>
                {step2Options.map((el, i) => {
                    return <Step2Item key={i} index={i} text={el}
                    imgClass={`icon-newCar${i} step2-item__container-img`}
                    setData={setData} data={data}/>
                })}
            </fieldset>
            <fieldset>
                <legend>Дополнительные услуги</legend>
                {step2Service.Services.map((el, i) => {
                    return <Step2Item key={i} index={i+step2Options.length} service
                    text={el.service} description={el.description} 
                    setData={setData} data={data}
                    />
                })}
            </fieldset>
        </div>
        </form>
    )
}

export default Step2;