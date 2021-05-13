import React, { memo } from 'react';
import { useSelector } from 'react-redux';

const FormBlock = React.forwardRef(({ 
    label, name, type, 
    autoComplete="off",
    hint=label, 
    isMini, 
    errorName,
    triggerForSubmit,
    changeType,
    password
     }, ref) => {

        const errMail = useSelector(state => state.registration.errMail);
    if(errorName) {
        if(errorName.type == "required") { errorName.message = "Поле не должно оставаться пустым" }
        else if(errorName.type == "minLength") { errorName.message = "Поле должно содержать больше символов" }
        else if(errorName.type == "maxLength") { errorName.message = "Поле должно содержать меньше символов" }
        else if(errorName.type == "validate") { errorName.message = "Пароли не совпадают" }
        else if(errorName.type == "pattern") { errorName.message = "Введите корректный адрес электронной почты" }
    }
    const date = new Date();
    let dateMinus14 = `${date.getFullYear()-14}-12-31`.toString();

    return (
    <>
    {/* PaddingBottomErrors */}
    <div className={errorName || (errMail && name=="mail") 
    ? "form-block invalid" : "form-block"}>

        <label>{label}</label>
        <div className={password ? "wrapper password-input" : "wrapper"}>
            <input name={name} type={type} ref={ref } autoComplete = {autoComplete} 
            onChange={triggerForSubmit} onFocus={triggerForSubmit} onBlur={triggerForSubmit}
            max={ name == "birthday" ? dateMinus14 : "" }
            /*Красная обводка*/
            className={(!isMini && !errorName ? "" 
            : isMini && errorName ? "is-mini invalid" : isMini ? "is-mini" 
            : errorName ? "invalid" : "") 
            || (errMail && name=="mail" ? "invalid" : "")}

            placeholder={hint} />
            {errorName && <span className={password ? "error-pass" : "error"}>{errorName.message}</span>}
            {errMail && name=="mail" ? <span className="error">{errMail}</span> : ""}
            {password && <span onClick={ changeType } className="hide-pass icon-eye-off"></span>}
            
        </div>
    </div>
    </>
)
})

export default memo(FormBlock);

