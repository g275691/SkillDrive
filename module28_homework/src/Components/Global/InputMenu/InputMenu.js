import React, { useEffect, useState } from 'react';
import DatePicker from '../Datepicker/DatePicker';
import InputMenuItem from './InputMenuItem';

const InputMenu = React.forwardRef(({ 
    list=[],
    datePicker,
    selectedCity,
    defaultValue,
    name, label,
    stateDate, stateDispatch
}, ref) => {

    useEffect(() => {
        
    },[])

    let [inputValue, setInputValue] = useState(defaultValue)
    let [isFocus, setFocus] = useState(false);

    let [menu, setMenu] = useState(list);
    let sortMenu = [...menu];

    return (
        <div className="input__menu__container" tabIndex="1">
            <div className="input__menu__container-select">
                <input className={isFocus ? "is-focus" : ""} name={name} autoComplete="off"
                onFocus={()=>{setFocus(true); setMenu(menu => [...new Set(menu)])}} 
                onBlur={()=>setFocus(false)}
                onChange = {e => setInputValue(e.target.value)}
                value={inputValue}
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
            </div>
            {list 
            && <div className={isFocus ? "input__menu__container-list is-focus" : "input__menu__container-list" }
            onBlur={()=>setFocus(false)}
            tabIndex="1">
            {menu.map((el,i) => {
                return <InputMenuItem key={i} city={el} selectedCity={selectedCity} onMouseDown={e=>{setInputValue(e.target.innerText); setFocus(false); }}/>;
            })
            }
            
            </div>}
            {datePicker 
            && <DatePicker enabled="true" stateDate={stateDate} stateDispatch={stateDispatch}/>}
            
        </div>
    )
})

export default InputMenu;

