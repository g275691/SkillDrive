import { connect } from 'react-redux';

import { OnSubmit } from '../../../Components/Registr-page/Step1/OnSubmit';

import { setRedirect, setButtonLoad, setWarning, setRegButtonActive, setErrMail } 
from '../../../Store/Registration/actions';

const mapStateToProps = state => {
    return {
        name: state.registration.name,
        mail: state.registration.mail,
        password: state.registration.password,
        birthday: state.registration.birthday,
        phone: state.registration.phone,
        passport: state.registration.passport,
        passportDate: state.registration.passportDate,
        passportOrgan: state.registration.passportOrgan,
        passportCode: state.registration.passportCode,
        driver: state.registration.driver,
        driverDate: state.registration.driverDate,
        isValid: state.registration.isValid,
        regButtonActive: state.registration.regButtonActive,
        errMail: state.registration.errMail,
        buttonLoad: state.registration.buttonLoad,
        redirect: state.registration.redirect,
    };
}

const mapDispatchToProps = dispatch => ({
    setRedirect: text => dispatch(setRedirect(text)),
    setButtonLoad: text => dispatch(setButtonLoad(text)),
    setWarning: text => dispatch(setWarning(text)),
    setRegButtonActive: text => dispatch(setRegButtonActive(text)),
    setErrMail: text => dispatch(setErrMail(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OnSubmit);