import React, { useEffect, useState } from 'react';

const OnSubmit = ({ isStep, setStep, buttonLoad }) => {
    return (
        <div className="submit-block">
            <div className="submit-block-rect"></div>
            <button type="submit" 
            // className={ (regButtonActive1 && isStep1) 
            // || (regButtonActive2 && isStep2)
            // || (regButtonActive3 && isStep3)
            // ? "" : "is-disable" }
            // onClick={()=>{
            // isStep2 && (setStep3(true), setStep2(false));
            // isStep3 && setFinishReg()
            // }}
            > 
            {buttonLoad ? " " : "Продолжить"}
        </button>
        <div className="cssload-container">
            <div className={buttonLoad 
                ? "cssload-zenith animate" : "cssload-zenith"}></div>
        </div>
        </div>
    )
}

export default OnSubmit;