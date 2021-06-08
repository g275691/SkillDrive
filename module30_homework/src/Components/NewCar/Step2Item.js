import React, { useEffect, useState } from 'react';

const Step2Item = ({
    index,
    text,
    description,
    imgClass,
    service,
    setData, data
}) => {

    const [active, setActive] = useState(false);
    const changeCheckpoint = () => {
        active ? setActive(false) : setActive(true);
        let newData = [...data];
        !active ? newData[index] = true : newData[index] = false;
        
        setData(newData)
    }

    return (
        <div className={service ? "step2-item__container service" : "step2-item__container"}>
            <div className={imgClass}></div>
            <div className={service ? "step2-item__container-text service" : "step2-item__container-text"}>
                {text}{service && <span><br />{description}</span>}
            </div>
            {service ? 
            <div className={active ? "step2-item__container-price active" : "step2-item__container-price"}>
                1 000 ₽
            </div> 
            : ""}
            <div 
            className={active 
                ? (service ? "step2-item__container-checkpoint active service" : "step2-item__container-checkpoint active")
                : (service ? "step2-item__container-checkpoint service" : "step2-item__container-checkpoint")}
            style={{marginLeft: service ? "0px" : "auto"}}
            onClick={changeCheckpoint}>
                <div 
                className={active 
                    ? "step2-item__container-checkpoint-circle active" :
                "step2-item__container-checkpoint-circle"}
                >
                </div>
            </div>
        </div>
    )
}

export default Step2Item;