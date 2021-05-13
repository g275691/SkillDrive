import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../../Global/Header/Header';
import FormBlock from './FormBlock';
import FormBlockDate from './FormBlockDate';

import {validatorOnChange} from './Validators';
import {validatorOnBlur} from './Validators';
import {onSubmit} from './onSubmit';


let isValid;
const Step1 = () => {
    
    useEffect(() => { 
        document.title="SkillDrive. Регистрация. 1 шаг"; 
        //Активация скрипта календаря
        $(function(){ $("input[data-name='date']").datepicker(); });

        //Кнопка разблокируется только, если нигде не высвечиваются ошибки валидации
        isValid = errPass=='' && errName=='' 
        && errMail=='' && birthday!=='' && errPhone=='' && errPassport=='' && errPassportOrgan=='' && passportDate!=='' && errPassportCode==''
        && errDriver=='' && driverDate!=='';

        isValid ? setButActiv(true) : 
        setTimeout(() => {
            setButActiv(false);      
        }, 300);
    });

//Состояния инпутов с состоянием их ошибок (не знаю как тут уменьшить количество кода)
    let [name, setName] = useState('');
    let [errName, setErrName] = useState(undefined);

    let [password, setPassword] = useState('');
    let [errPass, setErrPass] = useState(undefined);

    let [birthday, setBirthday] = useState('');
    let [errBirthday, setErrBirthday] = useState(undefined);

    let [mail, setMail] = useState('');
    let [errMail, setErrMail] = useState(undefined);

    let [phone, setPhone] = useState('');
    let [errPhone, setErrPhone] = useState(undefined);

    let [passport, setPassport] = useState('');
    let [errPassport, setErrPassport] = useState(undefined);

    let [passportDate, setPassportDate] = useState('');
    let [errPassportDate, setErrPassportDate] = useState(undefined);

    let [passportOrgan, setPassportOrgan] = useState('');
    let [errPassportOrgan, setErrPassportOrgan] = useState(undefined);

    let [passportCode, setPassportCode] = useState('');
    let [errPassportCode, setErrPassportCode] = useState(undefined);

    let [driver, setDriver] = useState('');
    let [errDriver, setErrDriver] = useState(undefined);

    let [driverDate, setDriverDate] = useState('');
    let [errDriverDate, setErrDriverDate] = useState(undefined);

    let [warning, setWarning] = useState(undefined);
    let [submitActive, setSubmitActive] = useState(false);
    let [butActiv, setButActiv] = useState(false);
    let [link, linkActive] = useState(false);

if(link) return ( <Redirect to="/success" /> )
return (
<>
<div className={warning ? "warning is-active" : "warning"}>{warning}</div>
<Header />
<section className="registration">
    <div className="registration__container">
        <div className="registration__container-step">Шаг 1 из 3</div>
        <h1>Расскажите о себе</h1>
        <form>
            <fieldset>
                <legend>Информация о вас</legend>
                <FormBlock text="ФИО" hint="ФИО полностью" value={name} isValid={errName} errMesage={errName}
                onChange={e => {setName(e.target.value); validatorOnChange(name, setErrName, false, /.+ .+ .+/)}} 
                onBlur={() => validatorOnBlur(name, setErrName, false, false, 3)} />

                <FormBlock type="password" text="Пароль" hint="Придумайте пароль" value={password} isValid={errPass}
                onChange={e => {setPassword(e.target.value); validatorOnChange(password, setErrPass, false, false, 6)}} 
                onBlur={() => validatorOnBlur(password, setErrPass, false, false, 6)} errMesage={errPass}/>

                <FormBlockDate text="Дата рождения" value={birthday} isMini isValid={errBirthday} errMesage={errBirthday}
                onBlur={e => { setTimeout(() => { setBirthday(e.target.value); }, 1000); }} />

                <FormBlock text="Электронная почта" hint="mail@example.com" value={mail} isValid={errMail} 
                onChange={e => {setMail(e.target.value); validatorOnChange(mail, setErrMail, false, /\w+@\w+\.\w+/)}} 
                onBlur={() => validatorOnBlur(mail, setErrMail, false, /\w+@\w+\.\w+/)} errMesage={errMail}/>

                <FormBlock type="number" text="Телефон" hint="+7 900 000-00-00" value={phone} isMini isValid={errPhone}
                onChange={e => {setPhone(e.target.value); validatorOnChange(phone, setErrPhone, false, false, 12, 13)}} 
                onBlur={() => validatorOnBlur(phone, setErrPhone, false, false, 11, 13)} errMesage={errPhone}/>
            </fieldset>
            <fieldset>
                <legend>Паспорт</legend>
                <FormBlock type="number" text="Серия и номер" hint="0000 000000" value={passport} isMini isValid={errPassport} 
                onChange={e => {setPassport(e.target.value); validatorOnChange(passport, setErrPassport, 10)}} 
                onBlur={() => validatorOnBlur(passport, setErrPassport, 10)} errMesage={errPassport}/>

                <FormBlockDate text="Дата выдачи" value={passportDate} isMini isValid={errPassportDate}
                onBlur={e => { setTimeout(() => { setPassportDate(e.target.value); }, 1000); }} />

                <FormBlock text="Кем выдан" hint="Название органа выдавшего паспорт" value={passportOrgan} isValid={errPassportOrgan} 
                onChange={e => {setPassportOrgan(e.target.value); validatorOnChange(passportOrgan, setErrPassportOrgan)}} 
                onBlur={() => validatorOnBlur(passportOrgan, setErrPassportOrgan)} errMesage={errPassportOrgan}/>

                <FormBlock type="number" text="Код подразделения" hint="000-000" value={passportCode} isMini isValid={errPassportCode} 
                onChange={e => {setPassportCode(e.target.value); validatorOnChange(passportCode, setErrPassportCode, 6)}}
                onBlur={() => validatorOnBlur(passportCode, setErrPassportCode, 6)} errMesage={errPassportCode}/>

            </fieldset>
            <fieldset>
                <legend>Водительское удостоверение</legend>
                <FormBlock type="number" text="Серия и номер" hint="0000 000000" isValid={errDriver} value={driver} isMini
                onChange={e => {setDriver(e.target.value); validatorOnChange(driver, setErrDriver, 10)}} 
                onBlur={() => validatorOnBlur(driver, setErrDriver, 10)} errMesage={errDriver}/>

                <FormBlockDate text="Дата выдачи" hint="00.00.0000" value={driverDate} isValid={errDriverDate} 
                onBlur={e => { setTimeout(() => { setDriverDate(e.target.value); }, 1000); }} />

            </fieldset>
            
        </form>
        <div className="registration__container-rect"></div>
        <Link to="/success" rel="nofollow" onClick={e=>{if(!link) {e.preventDefault()} }}>
            <button className={butActiv ? "" : "is-disable"} type="submit"
            onClick={() => { onSubmit(name, password, birthday, mail, phone, passport, passportDate, passportOrgan, passportCode, 
            driver, driverDate, isValid, setWarning, setSubmitActive, setErrMail, linkActive);}}>
            {submitActive ? " " : "Продолжить"}
            </button>
            <div class="cssload-container">
	            <div class={submitActive ? "cssload-zenith animate" : "cssload-zenith"}></div>
            </div>
        </Link>      
    </div>
</section>

</>
)}
  
export default Step1;