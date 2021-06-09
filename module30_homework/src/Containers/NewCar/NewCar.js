import { connect } from 'react-redux';

import { NewCar } from '../../Components/NewCar/NewCar';

import { setPhotosCars, setPhotosCarsDocs, setRegButtonActive, setStep } from '../../Store/NewCar/actions';

const mapStateToProps = state => {
    const { NewCar } = state;
    return  NewCar;
}

const mapDispatchToProps = dispatch => ({
    setStep: number => dispatch(setStep(number)),
    setRegButtonActive: text => dispatch(setRegButtonActive(text)),
    setPhotosCars: text => dispatch(setPhotosCars(text)),
    setPhotosCarsDocs: text => dispatch(setPhotosCarsDocs(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewCar);
