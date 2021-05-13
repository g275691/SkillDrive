import React from 'react';

const FormBlock = ({text, type, hint, onChange, valueI, isMini, onBlur, isValid, errMesage}) => {

    return (
        <>
        <div className={isValid ? "form-block invalid" : "form-block"}>
            <label>{text}</label>
            <div className="wrapper">
                <input type={type} className={!isMini && !isValid ? "" : isMini && isValid ? "is-mini invalid" : isMini ? "is-mini" : isValid ? "invalid" : ""}
                placeholder={hint}
                onChange={onChange} value={valueI} onBlur={onBlur} />
                {isValid != '' ? <span className="error">{errMesage}</span> : ''}
            </div>
        </div>
        </>
    )
}

export default FormBlock;

