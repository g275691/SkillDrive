import { connect } from 'react-redux';

import { NewCar } from '../../Components/NewCar/NewCar';

import { setRegButtonActive } from '../../Store/NewCar/actions';

const mapStateToProps = state => {
    const { NewCar } = state;
    return  NewCar;
}

const mapDispatchToProps = dispatch => ({
    setRegButtonActive: text => dispatch(setRegButtonActive(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCar);
