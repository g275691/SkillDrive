import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import Header from '../../../Containers/Header/Header';
import OnSubmit from '../../../Containers/Registration/Step1/OnSubmit';
import AllForms from '../../../Containers/Registration/Step1/AllForms';

export const Step1 = ({ redirect, warning }) => {

    useEffect(() => { 
        document.title="SkillDrive. Регистрация. 1 шаг"; 
        //Активация скрипта календаря
        $(function(){ $("input[data-name='date']").datepicker(); });
    });

if(redirect) return ( <Redirect to="/success" /> )
return (
<>
<div className={warning ? "warning is-active" : "warning"}>{warning}</div>
<Header />
<section className="registration">
    <div className="registration__container">
        <div className="registration__container-step">Шаг 1 из 3</div>
        <h1>Расскажите о себе</h1>
        <AllForms />
        <div className="registration__container-rect"></div>
        <OnSubmit />
    </div>
</section>

</>
)}
 