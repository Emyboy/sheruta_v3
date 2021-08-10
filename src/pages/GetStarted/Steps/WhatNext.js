import React from 'react'
import { connect } from 'react-redux'
import Btn from '../../../components/Btn/Btn';
import Layout from '../../../components/Layout/Layout';

const WhatNext = (props) => {
    return (
      <Layout>
        <div className="container">
          <div className="pt-5">
            <div className="sec-heading center mb-4">
              <h2 className="animated animate__bounceIn">What Next?</h2>
              <p>
                Read the steps below to find how to become a member of sheruta
              </p>
            </div>
          </div>
          <div className="row pb-5">
            <div className="col-lg-4 col-md-4">
              <div className="middle-icon-features">
                <div className="middle-icon-features-item">
                  <div className="middle-icon-large-features-box">
                    <i className="">1</i>
                    {/* <span className="steps bg-danger">01</span> */}
                  </div>
                  <div className="middle-icon-features-content">
                    <h4>Subscribe</h4>
                    <p>
                      Subscribe to join the community of verified flat mates.
                    </p>
                    <Btn text='Subscribe Now' onClick={() => {}} className='btn-sm mt-2' />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="middle-icon-features">
                <div className="middle-icon-features-item">
                  <div className="middle-icon-large-features-box">
                    <i className="text-success">2</i>
                    {/* <span className="steps bg-success">02</span> */}
                  </div>
                  <div className="middle-icon-features-content">
                    <h4>post &amp; Search Property</h4>
                    <p>
                      Find shared apartments that fit your lifestyle and living
                      standard around Lagos without scraping your bank account..
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-4">
              <div className="middle-icon-features">
                <div className="middle-icon-features-item">
                  <div className="middle-icon-large-features-box">
                    <i className="text-warning">3</i>
                    {/* <span className="steps bg-warning">03</span> */}
                  </div>
                  <div className="middle-icon-features-content">
                    <h4>feedback</h4>
                    <p>
                      Book and rent your potential new home at your comfort with
                      little or no stress. Free online consultation for user.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(WhatNext)
