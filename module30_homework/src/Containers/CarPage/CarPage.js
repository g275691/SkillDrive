import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { CarPage } from '../../Components/CarPage/CarPage';
import { setCarPage, setCarPageSuccess, setCarPageRequest } from '../../Store/CarPage/actions';

const mapStateToProps = state => {
    const { CarPage } = state;
    return  CarPage;
}

// const mapDispatchToProps = dispatch => ({
//     setCarPage: text => dispatch(setCarPage(text)),
// });

// const mapDispatchToProps = dispatch => {
//     setCarPage: text => dispatch(setCarPage(text)),
// };

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ 
        setCarPage,
         setCarPageSuccess, 
         setCarPageRequest }
        , dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CarPage);
