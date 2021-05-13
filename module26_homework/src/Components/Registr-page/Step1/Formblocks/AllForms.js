import React, { useEffect, useState } from 'react';
import FormBlock from './FormBlock';
import FormBlockDate from './FormBlockDate';
import {validatorOnChange} from '../../../Global/Validators/Validators';
import {validatorOnBlur} from '../../../Global/Validators/Validators';

export const AllForms = ({
    name, mail, password, birthday, phone, 
    passport, passportDate, passportOrgan, passportCode,
    driver, driverDate, setName, setMail, setPassword, setBirthday, setPhone,
    setPassport, setPassportDate, setPassportOrgan, setPassportCode,
    setDriver, setDriverDate, errMail, setErrMail,
    isValid, setAllValid, setRegButtonActive }) => {

    useEffect(() => { 
        document.title="SkillDrive. Регистрация. 1 шаг"; 
        //Активация скрипта календаря
        $(function(){ $("input[data-name='date']").datepicker(); });

        // document.querySelectorAll("input").forEach(el => el.value!="" ? setAllValid(true) : setAllValid(false));
        // let validInputs = errPass=='' && errName=='' 
        // && errMail=='' && birthday!=='' && errPhone=='' 
        // && errPassport=='' && errPassportOrgan=='' && passportDate!=='' && errPassportCode==''
        // && errDriver=='' && driverDate!=='';
        // console.log(validInputs);
        errPass=='' && errName=='' 
        && errMail=='' && birthday!=='' && errPhone=='' 
        && errPassport=='' && errPassportOrgan=='' && passportDate!=='' && errPassportCode==''
        && errDriver=='' && driverDate!=='' ? setAllValid(true) : setAllValid(false);
        // let validInputs;
        isValid == true ? setRegButtonActive(true) : 
        setTimeout(() => {
            setRegButtonActive(false);      
        }, 300);
    });

    let [errName, setErrName] = useState(undefined);
    let [errPass, setErrPass] = useState(undefined);
    let [errBirthday, setErrBirthday] = useState(undefined);
    let [errPhone, setErrPhone] = useState(undefined);
    let [errPassport, setErrPassport] = useState(undefined);
    let [errPassportDate, setErrPassportDate] = useState(undefined);
    let [errPassportOrgan, setErrPassportOrgan] = useState(undefined);
    let [errPassportCode, setErrPassportCode] = useState(undefined);
    let [errDriver, setErrDriver] = useState(undefined);
    let [errDriverDate, setErrDriverDate] = useState(undefined);
    return (
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
    )
}