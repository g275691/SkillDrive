import React, { useEffect } from 'react';

const InputBlock = ({type, text, value, setState, mail, isValid, setValid, serverErr, pass, onClickForgetPass}) => {
    let [isFocus, setFocus] = React.useState(false);

    useEffect(()=> {
        if(document.querySelector("input").value != "") document.querySelector("label").classList.add("is-focus");
    })

    return (

    <div className="modal__container-form-block">
        <input type={type} value={value} 
        onChange={e => {setState(e.target.value);
        if(e.target.value.length > 5 && (mail ? /\w+@\w+\.\w\w+/.test(e.target.value) : true)) 
        {setValid(false)}}}
        className={isValid || serverErr ? "is-valid" : ""}
        onFocus={() => setFocus(true)} 
        onBlur={e => {if(e.target.value=="") {setFocus(false)};
        e.target.value.length > 5 && (mail ? /\w+@\w+\.\w+/.test(e.target.value) : true) ? setValid(false) : setValid(true)}}/>
        <label className={!isFocus && !isValid ? "" : isFocus && isValid ? "is-focus is-valid" : isFocus ? "is-focus" : isValid ? "is-valid" : ""}>{text}</label>
        {pass ? <div class="wrapper">
                    <div className="forget-pass" onClick={onClickForgetPass}>Забыли?</div>
                </div> : ""}
    </div>

    )
}

export default InputBlock;