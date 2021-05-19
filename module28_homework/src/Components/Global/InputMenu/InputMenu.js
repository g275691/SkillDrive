import React, { useEffect, useState } from 'react';
import InputMenuItem from './InputMenuItem';

const InputMenu = ({
    list,
    selectedCity,
    defaultValue
}) => {

    useEffect(() => {
        
    },[])

    let [inputValue, setInputValue] = useState(defaultValue)
    let [isFocus, setFocus] = useState(false);
    let test = [...list];

    let [menu, setMenu] = useState(list);
    

    return (
        <div className="input__menu__container" tabIndex="1">
            <div className="input__menu__container-select">
                <input className={isFocus ? "is-focus" : ""} 
                onFocus={()=>{setFocus(true); setMenu(menu => [...new Set(menu)])}} 
                onBlur={()=>setFocus(false)}
                onChange = {e => setInputValue(e.target.value)}
                value={inputValue}
                onInput={e=>{
                    setMenu(menu => menu.sort((x,y)=>x.match(e.target.value) ? -1 : y.match(e.target.value) ? 1 : 0))
                }}
                ></input>
                <label className={isFocus || inputValue != "" ? "is-focus" : ""}>Местоположение</label>
            </div>
            <div className={isFocus ? "input__menu__container-list is-focus" : "input__menu__container-list" }
            onBlur={()=>setFocus(false)}
            tabIndex="1">
            {menu.map(el => {
                return <InputMenuItem city={el} selectedCity={selectedCity} onMouseDown={e=>{setInputValue(e.target.innerText); setFocus(false); console.log(inputValue)}}/>;
            })
            }
            </div>
        </div>
    )
}

export default InputMenu;