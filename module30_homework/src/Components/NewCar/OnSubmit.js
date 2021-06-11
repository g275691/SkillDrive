import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setStep1Forms } from '../../Store/NewCar/actions';

const OnSubmit = ({ buttonLoad, 
    step1Values, step1OK,


 }) => {
    const dispatch = useDispatch();
    const isStep = useSelector(state => state.NewCar.isStep);

    return (
        <div className="submit-block">
            <div className="submit-block-rect"></div>
            <button type="submit" 
            className={
                (isStep == 1 && step1OK) 
                || (isStep == 2)
                ? "" : "is-disable"}
            // className={ (regButtonActive1 && isStep1) 
            // || (regButtonActive2 && isStep2)
            // || (regButtonActive3 && isStep3)
            // ? "" : "is-disable" }
            onClick={()=>{
            
            isStep == 1 ? dispatch(setStep1Forms(step1Values)) : "";
            isStep == 2 ? dispatch(setStep(3)) : ""
            }}
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