import { connect } from 'react-redux';

import { RentPage } from '../../Components/RentPage/RentPage';

import { setRegButtonActive } from '../../Store/RentPage/actions';

const mapStateToProps = state => {
    const { RentPage } = state;
    return  RentPage;
}

const mapDispatchToProps = dispatch => ({
    setRegButtonActive: text => dispatch(setRegButtonActive(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RentPage);
