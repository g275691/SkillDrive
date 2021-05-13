import { connect } from 'react-redux';
import { setMail } from '../Store/ResetPassword/actions';
import { setPass } from '../Store/ResetPassword/actions';
import { setRepeatPass } from '../Store/ResetPassword/actions';
import { ResetPassword } from '../Components/Global/Login/ResetPassword/ResetPassword';

const mapStateToProps = state => {
    return {
        mail: state.resetPass.mail,
        pass: state.resetPass.pass,
        repeatPass: state.resetPass.repeatPass
    };
}

const mapDispatchToProps = dispatch => ({
    setMail: text => dispatch(setMail(text)),
    setPass: text => dispatch(setPass(text)),
    setRepeatPass: text => dispatch(setRepeatPass(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);