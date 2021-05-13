import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserBirthday
    , setUserPassportDate
    , setUserDriverDate} from '../../../Store/Global/actions';

const DatePickerDay = ({ value
    , index
    , onBlur
    , typeDate
, stateDate }) => {

    const dispatch = useDispatch();
    const userBirthday = useSelector(state => state.global.userBirthday);
    const userPassportDate = useSelector(state => state.global.userPassportDate);
    const userDriverDate = useSelector(state => state.global.userDriverDate);

    const [dayActive, setDayActive] = useState(false);
    const setDay = () => {
        !dayActive && setDayActive(true);
        let newDate = [...stateDate] ;

        newDate[2] = value;

        if(typeDate == "userDriverDate") { dispatch(setUserDriverDate(newDate)) }
        else if(typeDate == "userPassportDate") { dispatch(setUserPassportDate(newDate)) }
        else if(typeDate == "userBirthday"){ dispatch(setUserBirthday(newDate)) }
        
        onBlur();
    };

    return (
        <div onClick={()=> index >= 7 && value!="" ? setDay() : ""}
        className={userBirthday[2] == value ? "active" : ""}>
            <span 
            style={{color: index < 7 && "#B1B1B1"
            , cursor: index < 7 ? "auto" : "pointer"}}>
                {value}
            </span>
        </div>
    )
}

export default DatePickerDay;