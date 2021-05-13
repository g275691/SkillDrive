import { connect } from 'react-redux';

import { Step1 } from '../../../Components/Registr-page/Step1/Step1';
import { setRegButtonActive } from '../../../Store/Registration/actions';

const mapStateToProps = state => {
    return {
        redirect: state.registration.redirect,
        warning: state.registration.warning,
        errName: state.registration.errName,
        errMail: state.registration.errMail,
    };
}

const mapDispatchToProps = dispatch => ({
    setRegButtonActive: text => dispatch(setRegButtonActive(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Step1);