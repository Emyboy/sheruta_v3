import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading/Heading";
import Layout from "../../components/Layout/Layout";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import HowToUse from "./HowToUse";
import WhatPeopleSay from "./WhatPeopleSay";
import axios from "axios";
import { Link } from "react-router-dom";
import Btn from "../../components/Btn/Btn";
import EachRequest from "../../components/EachRequest/EachRequest";
import Global from "../../Global";
import PropertyCardSM from "../../components/PropertyCard/PropertyCardSM";
import { connect } from "react-redux";
import SocailHomePage from "../../components/Social/SocialHomePage/SocialHomePage";
import Footer from "../../components/Footer";
import ExploreByPopularCity from "./Graphics";
import HomeJumbo from "./HomeJumbo";
import end_sarz from '../../assets/img/end_sarz.jpeg';
import match from "../../assets/img/match.jpeg";
import FreeRequestAds from '../../components/Ads/RequestAds/FeeRequestAds'
import Partners from '../../assets/img/partners.png';

const Home = (props) => {
  const { view, auth } = props;
  const { user } = auth;
  const [state, setState] = useState({
    properties: [],
    list: [],
  });

  useEffect(() => {
    if (state.properties.length === 0) {
      axios(
        process.env.REACT_APP_API_URL +
          `/properties/recent/${Global.isMobile ? "4" : "6"}`
      )
        .then((res) => {
          setState({ ...state, properties: res.data });
        })
        .catch((err) => {});
    }
  }, [state]);
  useEffect(() => {
    if (state.list.length === 0) {
      axios(
        process.env.REACT_APP_API_URL +
          `/property-requests/recent/${Global.isMobile ? "4" : "4"}`
      )
        .then((res) => {
          setState({ ...state, list: res.data });
        })
        .catch((err) => {});
    }
  }, [state]);

  useEffect(() => {
    
  },[user])
  return (
      <Layout page="home">
          {user && view.personal_info ? (
              <div className="container-fluid">
                  <SocailHomePage />
              </div>
          ) : (
              <>
                  {/* <div
            className="image-cover hero-banner mb-5"
            style={{
              background: `url("https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/project%20prism%2Fcolor%20search%20archive%2Ffdca42285757a45c50328d80460f369b415e66a3") no-repeat`,
              height: "5vh",
            }}
            data-overlay="6"
          >
            <div className="container text-center">
              <h1 className="big-header-capt mb-0">Find Verified Flatmates.</h1>
              <p className="text-center mb-5"></p>
              <Link to="/start">
                <Btn text="Get Started" className="shadow" onClick={() => {}} />
              </Link>
            </div>
          </div> */}
                  <HomeJumbo />
                      <ExploreByPopularCity />
                  <div className="text-center mb-5">
                      <h1 className="text-muted">Our Partners</h1>
                      <img src={Partners} width="800px" />
                  </div>
                  <div className="container-fluid">
                      <div className="row justify-content-center">
                          <div className="col-sm-12 col-md-6 mb-4">
                              <FreeRequestAds />
                          </div>
                      </div>
                  </div>
                  {/* {view.app_details
                      ? view.app_details.everything_free && (
                        )
                        : null} */}
                  <div className="container">
                      <div className="text-center mb-5">
                          <img
                              src={end_sarz}
                              className="rounded shadow"
                              width="100%"
                          />
                      </div>
                  </div>

                  <div className="container-fluid">
                      <div className="row bgc-f7 pt-3">
                          <div className="col-lg-8 col-md-12 col-sm-12">
                              <Heading
                                  heading="Recent Properties"
                                  subHeading="These are the most recent properties we have."
                              />
                              {/* <hr /> */}
                              <div className="row">
                                  {state.properties.map((val, i) => {
                                      return Global.isMobile ? (
                                          <PropertyCardSM key={i} val={val} />
                                      ) : (
                                          <PropertyCard key={i} data={val} />
                                      );
                                  })}
                              </div>
                              <div className="text-center">
                                  <Link
                                      to="/properties"
                                      className="reviews-checked theme-cl btn text-thm"
                                  >
                                      <i className="fas fa-arrow-alt-circle-down mr-2"></i>
                                      See More Properties
                                  </Link>
                              </div>
                              {Global.isMobile ? <hr /> : null}
                          </div>
                          <div className="col-lg-4 col-md-12 col-sm-12">
                              <Heading
                                  heading="Recent Requests"
                                  subHeading="These are the most recent requests we have."
                              />
                              <img src={match} className="mb-3 rounded" />

                              <div className=" pl-0 pr-1">
                                  <div className="block-body">
                                      <div className="author-review">
                                          <div className="comment-list">
                                              <div className="article_comments_wrap">
                                                  {state.list.map((val, i) => {
                                                      return (
                                                          <EachRequest
                                                              key={i}
                                                              data={val}
                                                          />
                                                      );
                                                  })}
                                              </div>
                                          </div>
                                      </div>
                                      <div className="text-center">
                                          <Link
                                              to="/requests/all"
                                              className="reviews-checked theme-cl text-thm"
                                          >
                                              <i className="fas fa-arrow-alt-circle-down mr-2"></i>
                                              See More Requests
                                          </Link>
                                      </div>
                                  </div>
                              </div>
                              {Global.isMobile ? <hr /> : null}
                          </div>
                      </div>
                  </div>
                  <HowToUse />
                  <WhatPeopleSay />
                  <Footer />
              </>
          )}
      </Layout>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  view: state.view,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
