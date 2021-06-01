import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSecondDate } from '../../../Store/RentPage/actions';

const DatePickerDay = ({ day, month, year
    , index
    , onBlur
    , stateDispatch, stateDispatch2
, stateDate, stateDate2, twoDate,
 }) => {

    useEffect(()=> {
       
    },[])
    
    const dispatch = useDispatch();
    const isSecondDate = useSelector(state => state.RentPage.isSecondDate);

    const [dayActive, setDayActive] = useState(false);
    const setDay = () => {
        !dayActive && setDayActive(true);
        let newDate = isSecondDate ? [...stateDate2] : [...stateDate];
        newDate[2] = day;
        
        if(!twoDate) return (dispatch(stateDispatch(newDate)), onBlur());
        
        isSecondDate 
        ? (dispatch(stateDispatch2(newDate))
        ,onBlur() 
        ,dispatch(setSecondDate(false)
        ))
        : (dispatch(stateDispatch(newDate))
        , dispatch(setSecondDate(true)
        ))
    };

    return (
        <div className={
            new Date([year, month,day]) > new Date(stateDate) 
            && new Date([year, month,day]) < new Date(stateDate2)
            ? "marking-date interval"
            : "marking-date"
        }
        style={{
            background: 
            (stateDate[2] == day 
                && stateDate[0] == year 
                && stateDate[1] == month 
                ? "linear-gradient(to left, #DFECEB 50%, white 50% )" 
            : (stateDate2[2] == day 
                && stateDate2[0] == year 
                && stateDate2[1] == month 
                ? "linear-gradient(to right, #DFECEB 50%, white 50% )" : ""))
        
        }}
        >
            
            <div onMouseDown={()=> {index >= 7 && day!="" ? setDay() : ""
            }}

            className={
                (stateDate[2] == day && stateDate[0] == year && stateDate[1] == month) 
                || 
                (stateDate2[2] == day && stateDate2[0] == year && stateDate2[1] == month) 

            ? "active" : ""}>
                
                    <span className={index > 7 ? "" : "interval"}
                    style={{color: index < 7 && "#B1B1B1"
                    , cursor: index < 7 ? "auto" : "pointer"
                    }}>
                        {day}
                    </span>

            </div>
        </div>
    )
}

export default DatePickerDay;