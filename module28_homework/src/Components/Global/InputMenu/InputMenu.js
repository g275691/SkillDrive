import React, { useEffect, useState } from 'react';
import DatePicker from '../Datepicker/DatePicker';
import InputMenuItem from './InputMenuItem';
import { useDispatch } from 'react-redux';
import { setSecondDate } from '../../../Store/RentPage/actions';

const InputMenu = React.forwardRef(({ 
    list=[],
    datePicker, category, 
    selectedCity,
    defaultValue,
    name, label, id,
    value,
    stateDate, stateDate2
    , stateDispatch, stateDispatch2, 
    className
}, ref) => {
    
    const dispatch = useDispatch();

    let [inputValue, setInputValue] = useState(defaultValue)
    let [isFocus, setFocus] = useState(false);

    let [menu, setMenu] = useState(list);
    let sortMenu = [...menu];

    let [datePickerEnabled, setDatePickerEnabled] = useState(false);

    return (
        <div className="input__menu__container" tabIndex="1">
            <div className="input__menu__container-select">
                <input className={isFocus ? "is-focus" : ""} name={name} autoComplete="off" id={id}
                onFocus={()=>{
                    setFocus(true); setMenu(menu => [...new Set(menu)]);
                    datePicker && setDatePickerEnabled(true)
                }} 
                onBlur={()=>{setFocus(false)}}
                onChange = {e => setInputValue(e.target.value)}
                value={datePicker ? value : inputValue}
                onInput={e=>{
                    sortMenu.forEach((el,i,arr) => {
                        let regExp = new RegExp('^' + e.target.value, "i");
                        regExp.test(el) && e.target.value != ""
                        ? (arr.splice(i,1), arr.unshift(el)) : ""
                    })
                    setMenu(sortMenu);
                }}
                ref = {ref}
                ></input>
                <label className={isFocus || inputValue != "" ? "is-focus" : ""}>{label}</label>
                {datePicker && <div className="icon-calendar"></div>}
                {category && <div className="icon-category">▼</div>}
            </div>
            
            {list 
            && <div className={isFocus ? "input__menu__container-list is-focus" : "input__menu__container-list" }
            onBlur={()=>setFocus(false)}
            tabIndex="1">
            {menu.map((el,i) => {
                return <InputMenuItem key={i} city={el} selectedCity={inputValue} onMouseDown={e=>{setInputValue(e.target.innerText); setFocus(false); }}/>;
            })
            }
            
            </div>}
            {datePicker 
            && <DatePicker enabled="true" 
            stateDate={stateDate} stateDate2={stateDate2}
            stateDispatch={stateDispatch} stateDispatch2={stateDispatch2}
            enabled={datePickerEnabled}
            onBlur={()=>{
                setDatePickerEnabled(false); 
                dispatch(setSecondDate(false));
            }}
            twoDate="true"
            />}
            
        </div>
    )
})

export default InputMenu;

