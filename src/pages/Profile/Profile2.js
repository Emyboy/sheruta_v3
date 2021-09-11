// import React, { useState, useEffect } from 'react'
// import { connect } from 'react-redux'
// import { Redirect } from 'react-router';
// import { logout } from '../../redux/strapi_actions/auth.actions'
// import ProfileImageModal from './ProfileImageModal';
// import { notification, Tabs } from 'antd';
// import Btn from '../../components/Btn/Btn';
// import axios from 'axios';
// import EachRequest from '../Request/EachRequest';
// import Layout from '../../components/Layout/Layout';

// const { TabPane } = Tabs;
// function callback(key) {
//     console.log(key);
// }

// export const Profile2 = (props) => {
//     const { auth } = props;
//     const { user } = auth;

//     const [state, setState] = useState({
//         showImageModal: false,
//         userRequests: []
//     })

//     useEffect(() => {
//         if (user) {
//             axios(process.env.REACT_APP_API_URL + '/property-requests/?users_permissions_user=' + userData.id, {

//             })
//                 .then(res => {
//                     console.log('REQ --', res)
//                     setState({ ...state, userRequests: res.data })
//                 })
//                 .catch(err => {
//                     notification.error({ message: 'Error Fetching User Data' })
//                 })
//         }
//     }, [props.auth.user])

//     if (!props.auth.user) {
//         return <Redirect to='/login' />
//     } else
//         return (
//             <Layout
//                 page='profile'
//             >
//                 <section className="pt-2" style={{ height: '90vh', marginBottom: '20vh' }}>
//                     <ProfileImageModal show={state.showImageModal} handleClose={() => setState({ ...state, showImageModal: !state.showImageModal })} />
//                     <div className="container-fluid pb-5">
//                         <div className="row" style={{ justifyContent: 'center' }}>

//                             <div className="col-lg-9 col-md-8 p-0">
//                                 <div className="dashboard-navbar bg-white p-1" style={{ height: '81vh' }}>
//                                     <Tabs defaultActiveKey="1" onChange={callback}>
//                                         <TabPane tab="Profile" key="1" className='profile-content'>
//                                             <div className="d-user-avater">
//                                                 <img src={userData.avatar_url} className="img-fluid avater" alt=""  />
//                                                 <h4>{`${userData.first_name} ${userData.last_name}`}</h4>
//                                                 <span>{userData.email}</span><br />
//                                                 <span>@{userData.username}</span>
//                                                 <button
//                                                     onClick={() => setState({ ...state, showImageModal: !state.showImageModal })}
//                                                     className='btn btn-sm btn-success shadow'
//                                                     style={{ position: 'absolute', top: '104px', borderRadius: '15px' }}
//                                                 >Change Image</button>
//                                             </div>
//                                             <div className='text-center'>
//                                                 <Btn
//                                                     text={'Logout'}
//                                                     icon={'ti-power-off'}
//                                                     onClick={props.logout}
//                                                 />
//                                             </div>
//                                         </TabPane>
//                                         <TabPane tab="Requests" key="2" className='profile-content mb-5'>
//                                             <div className="comment-area">
//                                                 <div className="all-comments">
//                                                     <div className="comment-list container">
//                                                         <div className='row'>
//                                                             {
//                                                                 state.userRequests.map((val, i) => {
//                                                                     return <div className='col-lg-4 col-md-6 col-sm-12'>
//                                                                         <EachRequest val={val} key={i} />
//                                                                     </div>
//                                                                 })
//                                                             }
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </TabPane>
//                                     </Tabs>

//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </section>
//             </Layout>
//         )
// }

// const mapStateToProps = (state) => ({
//     auth: state.auth,
// })

// const mapDispatchToProps = {
//     logout
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Profile2)
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../../components/Layout/Layout";
import image from "../../social_css/images/resources/profile-image.jpg";
import image2 from "../../social_css/images/resources/author.jpg";
import { Tabs, notification } from "antd";
import axios from "axios";
import EachSocialRequest from "../../components/Social/EachSocialRequest";
import { Redirect } from "react-router";
import PageLoader from "../../components/PageLoader";
import PageNotFound from "../PageNotFound";
import PersonalInfo from "./PersonalInfo";
import ProfileSettings from "./ProfileSettings";
import { notifyEmy } from "../../utils/Sheruta";
const { TabPane } = Tabs;

export const Profile2 = (props) => {
  const { auth } = props;
  const { params } = props.match;
  const [state, setState] = useState({
    showImageModal: false,
    userRequests: [],
  });
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  // const user = props.auth.user;

  useEffect(() => {
    if (userData) {
      axios(
        process.env.REACT_APP_API_URL +
        "/property-requests/?users_permissions_user=" +
        userData.id,
        {}
      )
        .then((res) => {
          setState({ ...state, userRequests: res.data });
        })
        .catch((err) => {
          notification.error({ message: "Error Fetching User Data" });
          notifyEmy({
            heading: "Error fetch user requests",
            log: err,
            status: "error",
            url: window.location.pathname
          })
        });
    }
  }, [userData]);



  useEffect(() => {
    if (params.username) {
      axios(
        process.env.REACT_APP_API_URL + `/users/?username=${params.username}`
      )
        .then((res) => {
          console.log("USER --", res);
          if (res.data.length > 0) {
            setUserData(res.data[0]);
          } else {
            setNotFound(true);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log('ERROR --', err)
          notification.error({ message: "Error fetching user data" });
          setNotFound(true);
          notifyEmy({
            heading: "Error fetch user data",
            log: err,
            status: "error",
            url: window.location.pathname
          })
        });
    }
  }, [params]);

  if (loading) {
    return <PageLoader />
  } else if (notFound) {
    return <PageNotFound />
  } else {
    // const user = userData;
    return (
      <Layout>
        <section className="mt-0">
          <div className="gap2 gray-bg pt-2">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="row merged20" id="page-contents">
                    <div className="user-profile">
                      <figure>
                        <div className="edit-pp">
                          <label className="fileContainer">
                            <i className="fa fa-camera"></i>
                            <input type="file" />
                          </label>
                        </div>
                        <img
                          src={"https://picsum.photos/800/300/?blur"}
                          alt=""
                        />
                      </figure>

                      <div className="profile-section">
                        <div className="row">
                          <div className="col-lg-6 col-md-8">
                            <div
                              className="profile-author"
                              style={{ textAlign: "start" }}
                            >
                              <div className="profile-author-thumb">
                                <img alt="author" src={userData.avatar_url} />
                                <div className="edit-dp">
                                  <label className="fileContainer">
                                    <i className="fa fa-camera"></i>
                                    <input type="file" />
                                  </label>
                                </div>
                              </div>

                              <div
                                className="author-content"
                                style={{ textAlign: "start" }}
                              >
                                <p className="h4 author-name" href="about.html">
                                  {userData.first_name} {userData.last_name}
                                </p>
                                <div className="country">
                                  @{userData.username}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-100">
                      <Tabs defaultActiveKey="2">
                        <TabPane tab="My Requests" key="1">
                          <div>
                            {state.userRequests.map((val, i) => {
                              return <EachSocialRequest key={i} data={val} />;
                            })}
                          </div>
                        </TabPane>
                        <TabPane tab="My Personal Info" key="2">
                          <PersonalInfo userData={userData} />
                        </TabPane>
                        {
                          userData.id === auth.user.user.id ? <TabPane tab="Settings" key="3">
                            <ProfileSettings />
                          </TabPane> : null
                        }
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile2);
