import React from 'react'
import { connect } from 'react-redux'
import ConfigViewPopup from './ConfigViewPopup';
import GetStartedPopup from './GetStartedPopup';

const MasterPopup = (props) => {
    const { user } = props.auth;
    if(user){
        return (
          <>
            <ConfigViewPopup />
            <GetStartedPopup />
          </>
        );
    }else {
      return null
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MasterPopup)
