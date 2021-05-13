import { connect } from 'react-redux';
import { AllForms } from '../../Components/Global/Login/inputBlock/AllForms';

import { setLoginErrMail, setLoginErrPassword, setLoginErrServer, 
    setLoginMail, setLoginPassword, closeLogin, setFormForSend } 
from '../../Store/Login/actions';

const mapStateToProps = state => {
    return {
        mailLogin: state.login.mailLogin,
        passwordLogin: state.login.passwordLogin,
        isFormForSend: state.login.isFormForSend,
        isFormMailSent: state.login.isFormMailSent,
        errMailLogin: state.login.errMailLogin,
        errPasswordLogin: state.login.errPasswordLogin,
        errServerLogin: state.login.errServerLogin,
    };
}

const mapDispatchToProps = dispatch => ({
    setLoginMail: text => dispatch(setLoginMail(text)),
    setLoginPassword: text => dispatch(setLoginPassword(text)),
    setLoginErrMail: text => dispatch(setLoginErrMail(text)),
    setLoginErrPassword: text => dispatch(setLoginErrPassword(text)),
    setLoginErrServer: text => dispatch(setLoginErrServer(text)),
    closeLogin: text => dispatch(closeLogin(text)),
    setFormForSend: text => dispatch(setFormForSend(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllForms);