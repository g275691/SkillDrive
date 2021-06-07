import React, { useEffect, useState } from 'react';
import DatePicker from '../Datepicker/DatePicker';
import InputMenuItem from './InputMenuItem';
import { useDispatch } from 'react-redux';
import { setFinderHeading, setSecondDate } from '../../../Store/RentPage/actions';
import iconLupaGreen from '../../../Assets/img/Rent-page/icon-lupa-green.svg';
import {carBrandApi} from '../../NewCar/carBrandApi';

const InputMenu = React.forwardRef(({ 
    list=[],
    datePicker, category, allFilter,  
    menuBrand, arrow,
    selectedCity,
    defaultValue,
    name, label, id, idFilterAll,
    value, placeholder,
    isMini, readOnly,
    stateDate, stateDate2
    , stateDispatch, stateDispatch2, 
    isFinder, isMobilFinder,
    onClick, onInput
}, ref) => {
    
    const dispatch = useDispatch();

    let [inputValue, setInputValue] = useState(defaultValue)
    let [isFocus, setFocus] = useState(false);

    let [menu, setMenu] = useState(list);
    let sortMenu = [...menu];
    

    let [datePickerEnabled, setDatePickerEnabled] = useState(false);

    return (<>
        <div className={isFinder && !isMobilFinder ? "input__menu__container is-finder" : "input__menu__container"} tabIndex="1" id={idFilterAll}
        style={{
        display: isMobilFinder && !datePicker && "block",
        position: isMobilFinder && isFocus && category && "absolute"
        }}
        >
            <div className="input__menu__container-select">
                <input className={isFocus ? "is-focus" : (isMini ? "is-mini2" : "")} name={name} autoComplete="off" id={id}
                placeholder={placeholder} readOnly={readOnly}
                onFocus={e=>{
                    setFocus(true); setMenu(menu => [...new Set(menu)]);
                    datePicker && setDatePickerEnabled(true);
                    console.log(e.target.id);
                    if(e.target.id == "rent-date") dispatch(setFinderHeading("Даты"))
                    if(e.target.id == "rent-category") dispatch(setFinderHeading("Категория"))
                }} 
                onBlur={e=>{
                    setFocus(false);
                    if(e.target.id == "rent-category") dispatch(setFinderHeading("Поиск"))
                }}
                onChange = {e => setInputValue(e.target.value)}
                value={datePicker || allFilter ? value : inputValue}
                onInput={e => {
                    if(menuBrand) return carBrandApi(e.target.value, setMenu);
                    sortMenu.forEach((el,i,arr) => {
                        let regExp = new RegExp('^' + e.target.value, "i");
                        regExp.test(el) && e.target.value != ""
                        ? (arr.splice(i,1), arr.unshift(el)) : ""
                    })
                    setMenu(sortMenu);
                }
            }
                onClick={onClick}
                ref = {ref}
                ></input>
                <label className={isFocus || inputValue != "" ? "is-focus" : ""}>{label}</label>
                {datePicker && <div className="icon-calendar"></div>}
                {allFilter 
                && <div className="icon-lupa-green" 
                style={{background: `url(${iconLupaGreen})` }}
                ></div>}
                {category || arrow ? <div className="icon-category">▼</div> : ""}
            </div>
            
            {list 
            && <div className={isFocus 
                ? "input__menu__container-list is-focus" 
                : "input__menu__container-list" }
                style={{width: isMobilFinder ? "100%" : "329px"}}
            onBlur={()=>setFocus(false)}
            tabIndex="1">
            {sortMenu.map((el,i) => {
                return <InputMenuItem key={i} city={el} selectedCity={inputValue} category={category}
                onMouseDown={e=>{setInputValue(
                    category ? e.target.innerText.slice(0, e.target.innerText.indexOf("Категория")) : e.target.innerText.replace("🗸", ""))
                    ; setFocus(false); }}/>;
            })
            }
            
            </div>}
            {datePicker 
            && <DatePicker enabled="true" 
            stateDate={stateDate} stateDate2={stateDate2}
            stateDispatch={stateDispatch} stateDispatch2={stateDispatch2}
            enabled={datePickerEnabled} isMobilFinder={isMobilFinder}
            onBlur={()=>{
                setDatePickerEnabled(false); 
                dispatch(setSecondDate(false));
                dispatch(setFinderHeading("Поиск"));
            }}
            twoDate="true"
            />}
            
        </div>
        
        </>
    )
})

export default InputMenu;

