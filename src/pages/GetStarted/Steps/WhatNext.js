import React from 'react'
import { connect } from 'react-redux'

export const WhatNext = (props) => {
    return (
      <div>
        <div className="sec-heading center mb-4">
          <h2 className="animated animate__bounceIn">
            What Next?
          </h2>
          <p>Read the steps below to find how to become a member of sheruta</p>
        </div>
      </div>
    );
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(WhatNext)
