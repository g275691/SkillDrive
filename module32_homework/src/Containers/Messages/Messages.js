import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Messages } from '../../Components/Messages/Messages';

import { getUsers, getChat } from '../../Store/Messages/actions';

const mapStateToProps = state => {
    const { Messages } = state;
    return  Messages;
}

const mapDispatchToProps = dispatch => {
   return bindActionCreators({
       getUsers,
       getChat
   }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
