import React from 'react';
import { calendar } from '../calendar/calendar'

const FormBlockDate = ({text, hint, onChange, valueI, onBlur, isValid, errMesage}) => {
    function blockInput(event) { event.preventDefault(); }

    return (
    <div className={isValid ? "form-block invalid" : "form-block"}>
    <label>{text}</label>
    <div className="form-block-date">
        <div className="icon-Vector"></div>
        <div>
            <input type="text" className={isValid ? "is-mini invalid" : "is-mini"} 
                data-name="date"
                placeholder={hint}
                onClick={calendar}
                onChange={onChange} value={valueI} onBlur={onBlur}
                onKeyDown = {() => blockInput(event)}
                />
            {isValid != '' ? <span className="error">{errMesage}</span> : ''}
        </div>                       
    </div>
    </div>
    )
}

export default FormBlockDate;