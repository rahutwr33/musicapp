import React from 'react';
import {connect} from 'react-redux';
import {setCurrentUser} from '../globals/store/actions/auth';

const withHooksHOC = (Component) => {
  return (props) => {
    return <Component {...props} />;
  };
};
const mapStateToProps = (state) => ({
  Auth: state.Auth,
});

const mapDispatchToProps = {setCurrentUser};
export default connect(mapStateToProps, mapDispatchToProps)(withHooksHOC);
