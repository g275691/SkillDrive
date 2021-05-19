import { connect } from 'react-redux';

import { RentPage } from '../../Components/RentPage/RentPage';

import { setCarsList } from '../../Store/RentPage/actions';

const mapStateToProps = state => {
    const { RentPage } = state;
    return  RentPage;
}

const mapDispatchToProps = dispatch => ({
    setCarsList: text => dispatch(setCarsList(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RentPage);
