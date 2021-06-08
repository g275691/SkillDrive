import React from 'react';

const BackPageArrowC = ({ isStep, setStep }) => {
    return (
        <div className="back-page-arrow" 
            onClick={()=> isStep == 2
                ? setStep(1)
                : isStep == 3 ? setStep(2) : ""}>
            <span className="icon-back"></span>
            <span>Назад</span>
        </div>
    )
}

export default BackPageArrowC;