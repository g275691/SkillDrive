import { connect } from 'react-redux';

import { NewCar } from '../../Components/NewCar/NewCar';

import { setRegButtonActive, setStep } from '../../Store/NewCar/actions';

const mapStateToProps = state => {
    const { NewCar } = state;
    return  NewCar;
}

const mapDispatchToProps = dispatch => ({
    setStep: number => dispatch(setStep(number)),
    setRegButtonActive: text => dispatch(setRegButtonActive(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCar);
