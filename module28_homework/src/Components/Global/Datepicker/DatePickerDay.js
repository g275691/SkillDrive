import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const DatePickerDay = ({ value
    , index
    , onBlur
    , stateDispatch
, stateDate }) => {


    useEffect(()=> {
        console.log(stateDate)
    })
    const dispatch = useDispatch();

    const [dayActive, setDayActive] = useState(false);
    const setDay = () => {
        !dayActive && setDayActive(true);
        let newDate = [...stateDate];
        newDate[2] = value;
        dispatch(stateDispatch(newDate)),
        onBlur()
    };

    return (
        <div onMouseDown={e=> {index >= 7 && value!="" ? setDay() : ""
        }}
        className={stateDate[2] == value ? "active" : ""}>
            <span 
            style={{color: index < 7 && "#B1B1B1"
            , cursor: index < 7 ? "auto" : "pointer"}}>
                {value}
            </span>
        </div>
    )
}

export default DatePickerDay;