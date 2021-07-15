import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Messages } from '../../Components/Messages/Messages';

import { getUsers, getChatHistory } from '../../Store/Messages/actions';

const mapStateToProps = state => {
    const { Messages } = state;
    return  Messages;
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({
       getUsers,
       getChatHistory
   }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
