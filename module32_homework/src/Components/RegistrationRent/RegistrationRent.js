import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCarPage } from '../../Store/CarPage/actions';
import Header from '../Global/Header/Header';
import SuccessRegistrationRent from './SuccessRegistrationRent';
import logo from '../../Assets/img/logo.svg';
export const RegistrationRent = ({

}) => {

    const [active, setActive] = useState(false);
    const carPage = useSelector(state => state.CarPage.carPage);
    const dispatch = useDispatch();

    const [successPage, setSuccessPage] = useState(true);

    useEffect(()=>{
        dispatch(setCarPage(window.location.search.slice(1)));
    },[])

    if(!carPage) return (<div><Header/></div>)
    return (<>
        {successPage ? 
        <SuccessRegistrationRent />
    : <div className="registration-rent__container">
        
    </div>
    }    
    </>)
}
