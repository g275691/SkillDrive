import { connect } from 'react-redux';
import { AllForms } from '../../../Components/Registr-page/Step1/Formblocks/AllForms';

import { setRedirect, setButtonLoad, setWarning, setRegButtonActive, setErrMail,
    setName, setMail, setPassword, setBirthday, setPhone,
    setPassport, setPassportDate, setPassportOrgan, setPassportCode,
    setDriver, setDriverDate, setAllValid } 
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

    setName: text => dispatch(setName(text)),
    setMail: text => dispatch(setMail(text)),
    setPassword: text => dispatch(setPassword(text)),
    setBirthday: text => dispatch(setBirthday(text)),
    setPhone: text => dispatch(setPhone(text)),
    setPassport: text => dispatch(setPassport(text)),
    setPassportDate: text => dispatch(setPassportDate(text)),
    setPassportOrgan: text => dispatch(setPassportOrgan(text)),
    setPassportCode: text => dispatch(setPassportCode(text)),
    setDriver: text => dispatch(setDriver(text)),
    setDriverDate: text => dispatch(setDriverDate(text)),
    setAllValid: text => dispatch(setAllValid(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllForms);