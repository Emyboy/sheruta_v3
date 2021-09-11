import { notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Btn from "../../../components/Btn/Btn";
import Layout from "../../../components/Layout/Layout";
import { notifyEmy } from "../../../utils/Sheruta";

const WhatNext = (props) => {
  localStorage.setItem("after_payment", "/what-next");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [payment, setPayment] = useState(null);
  const [hasRequest, setHasRequest] = useState(false)

  const checkPaymentStatus = () => {
    setPaymentLoading(true);
    axios(
      process.env.REACT_APP_API_URL +
      "/transactions/?users_permissions_user=" +
      props.auth.user.user.id +
      "&status=success",
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      }
    )
      .then((res) => {
        setPaymentLoading(false);
        setPayment(res.data[0]);
      })
      .catch((err) => {
        setPaymentLoading(false);
        notification.error({ message: "Error verifying payment" });
        notifyEmy({
          heading: "Error fetching user transactions",
          log: err,
          url: window.location.pathname,
          status: "error",
        })
      });
  };

  const getUsersRequests = () => {
    axios(process.env.REACT_APP_API_URL + `/property-requests/?users_permissions_user=${props.auth.user.user.id}`)
      .then(res => {
        if (res.data.length > 0) {
          setHasRequest(true)
        }
      })
      .catch(err => {
        notification.error({ message: "Error fetching requests" })
        notifyEmy({
          heading: "Error fetching user request",
          log: err,
          url: window.location.pathname,
          status: "error",
        })
      })
  }

  useEffect(() => {
    checkPaymentStatus();
  }, []);
  useEffect(() => {
    getUsersRequests();
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
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
                  <p>Subscribe to join the community of verified flat mates.</p>
                  {payment ? (
                    <div className="badge text-success btn-lg">
                      <i className="ti ti-check display-7"></i>
                    </div>
                  ) : (
                    <Link to="/pricing">
                      <Btn
                        text="Subscribe Now"
                        disabled={paymentLoading}
                        onClick={() => { }}
                        className="btn-sm mt-2"
                      />
                    </Link>
                  )}
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
                  <h4>Post A Request</h4>
                  <p>Post something for the community.</p>
                  {
                    hasRequest ? <div className="badge text-success btn-lg">
                      <i className="ti ti-check display-7"></i>
                    </div> :
                      <Link to="/requests">
                        <Btn
                          onClick={() => { }}
                          text="Upload Now"
                          className="btn-sm mt-2"
                        />
                      </Link>
                  }
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
                    Help us improve you experience by giving us your honest
                    feedback.
                  </p>
                  <Link to="/feedback">
                    <Btn
                      onClick={() => { }}
                      text="Start"
                      className="btn-sm mt-2"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WhatNext);
