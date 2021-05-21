import { connect } from 'react-redux';

import { RentPage } from '../../Components/RentPage/RentPage';

import { setCarsList, setCarsListFilter, sortCarsList } from '../../Store/RentPage/actions';

const mapStateToProps = state => {
    const { RentPage } = state;
    return  RentPage;
}

const mapDispatchToProps = dispatch => ({
    setCarsList: text => dispatch(setCarsList(text)),
    setCarsListFilter: text => dispatch(setCarsListFilter(text)),
    sortCarsList: (city, category, date) => dispatch(sortCarsList(city, category, date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RentPage);
